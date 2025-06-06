import ldap from 'ldapjs'

export interface LdapUser {
  email: string
  displayName: string
  name: string
  title: string
  company: string
  department: string
  description: string
  principalName: string
  memberOf: string[]
}

export interface LdapConfig {
  url: string
  baseDn: string
  userSearchBase: string
  groupSearchBase: string
  searchUserUpn: string
  searchUserPassword: string
}

export class LdapService {
  private configs: LdapConfig[]

  constructor() {
    this.configs = this.parseConfigs()
  }

  private parseConfigs(): LdapConfig[] {
    const ldapServers = process.env.LDAP_SERVERS
    const ldapPort = process.env.LDAP_PORT || '389'
    const baseDn = process.env.LDAP_BASE_DN
    const userSearchBase = process.env.LDAP_USER_SEARCH_BASE
    const groupSearchBase = process.env.LDAP_GROUP_SEARCH_BASE
    const searchUserUpn = process.env.LDAP_SEARCH_USER_UPN
    const searchUserPassword = process.env.LDAP_SEARCH_USER_PASSWORD

    if (!ldapServers || !baseDn || !userSearchBase || !groupSearchBase || !searchUserUpn || !searchUserPassword) {
      throw new Error('LDAP_SERVERS, LDAP_BASE_DN, LDAP_USER_SEARCH_BASE, LDAP_GROUP_SEARCH_BASE, LDAP_SEARCH_USER_UPN, and LDAP_SEARCH_USER_PASSWORD environment variables are required')
    }

    const servers = ldapServers.split(',').map(server => server.trim())
    const protocol = ldapPort === '636' ? 'ldaps' : 'ldap'
    
    return servers.map(server => ({
      url: `${protocol}://${server}:${ldapPort}`,
      baseDn,
      userSearchBase,
      groupSearchBase,
      searchUserUpn,
      searchUserPassword
    }))
  }

  async authenticate(email: string, password: string): Promise<LdapUser | null> {
    for (const config of this.configs) {
      try {
        const user = await this.authenticateWithServer(config, email, password)
        if (user) {
          return user
        }
      } catch (err) {
        console.error(`LDAP authentication failed for server ${config.url}:`, err)
        continue
      }
    }
    return null
  }

  private async authenticateWithServer(
    config: LdapConfig, 
    email: string, 
    password: string
  ): Promise<LdapUser | null> {
    return new Promise((resolve, reject) => {
      const client = ldap.createClient({
        url: config.url,
        timeout: 5000,
        connectTimeout: 5000,
        tlsOptions: {
          rejectUnauthorized: false // Allow self-signed certificates
        }
      })

      client.on('error', (err) => {
        client.destroy()
        reject(err)
      })

      // Step 1: Authenticate user with their UPN/email and password
      client.bind(email, password, (bindError) => {
        if (bindError) {
          client.destroy()
          reject(bindError)
          return
        }

        console.log(`User credentials bind successful for ${email}`)

        // Step 2: Rebind with search user to get detailed user information
        client.bind(config.searchUserUpn, config.searchUserPassword, (searchBindError) => {
          if (searchBindError) {
            client.destroy()
            reject(searchBindError)
            return
          }

          console.log('Search user bind successful')

          // Step 3: Search for user details using their UPN
          this.getUserDetailsByUpn(client, config, email)
            .then((user) => {
              client.destroy()
              resolve(user)
            })
            .catch((err) => {
              client.destroy()
              reject(err)
            })
        })
      })
    })
  }

  private async getUserDetailsByUpn(
    client: ldap.Client, 
    config: LdapConfig, 
    upn: string
  ): Promise<LdapUser> {
    return new Promise((resolve, reject) => {
      const searchBase = `${config.userSearchBase},${config.baseDn}`
      const searchFilter = `(userPrincipalName=${upn})`
      
      const searchOptions: ldap.SearchOptions = {
        scope: 'sub',
        filter: searchFilter,
        attributes: [
          'company',
          'department', 
          'description',
          'displayName',
          'mail',
          'memberOf',
          'name',
          'title',
          'userPrincipalName'
        ]
      }

      client.search(searchBase, searchOptions, (searchError, searchResult) => {
        if (searchError) {
          reject(searchError)
          return
        }

        let userFound = false
        const user: Partial<LdapUser> = { memberOf: [] }

        searchResult.on('searchEntry', (entry) => {
          userFound = true
          const attributes = entry.pojo.attributes

          user.email = this.getAttributeValue(attributes, 'mail') || upn
          user.displayName = this.getAttributeValue(attributes, 'displayName') || ''
          user.name = this.getAttributeValue(attributes, 'name') || ''
          user.title = this.getAttributeValue(attributes, 'title') || ''
          user.company = this.getAttributeValue(attributes, 'company') || ''
          user.department = this.getAttributeValue(attributes, 'department') || ''
          user.description = this.getAttributeValue(attributes, 'description') || ''
          user.principalName = this.getAttributeValue(attributes, 'userPrincipalName') || upn
          
          const memberOf = this.getAttributeValues(attributes, 'memberOf')
          user.memberOf = memberOf.map(dn => this.extractGroupName(dn))
        })

        searchResult.on('error', (err) => {
          reject(err)
        })

        searchResult.on('end', () => {
          if (userFound && user.email && user.displayName && user.memberOf !== undefined) {
            resolve(user as LdapUser)
          } else {
            reject(new Error('User not found or incomplete user data'))
          }
        })
      })
    })
  }

  private getAttributeValue(attributes: unknown[], attributeName: string): string | undefined {
    const attr = attributes.find((a: unknown) => 
      typeof a === 'object' && a !== null && 'type' in a && a.type === attributeName
    ) as { values?: string[] } | undefined
    
    return attr?.values?.[0]
  }

  private getAttributeValues(attributes: unknown[], attributeName: string): string[] {
    const attr = attributes.find((a: unknown) => 
      typeof a === 'object' && a !== null && 'type' in a && a.type === attributeName
    ) as { values?: string[] } | undefined
    
    return attr?.values || []
  }

  private extractGroupName(distinguishedName: string): string {
    const match = distinguishedName.match(/^CN=([^,]+)/)
    return match ? match[1] : distinguishedName
  }
}