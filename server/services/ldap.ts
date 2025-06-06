import ldap from 'ldapjs'

export interface LdapUser {
  email: string
  displayName: string
  memberOf: string[]
}

export interface LdapConfig {
  url: string
  baseDn: string
  userSearchBase: string
  groupSearchBase: string
  bindDn?: string
  bindPassword?: string
}

export class LdapService {
  private configs: LdapConfig[]

  constructor() {
    this.configs = this.parseConfigs()
  }

  private parseConfigs(): LdapConfig[] {
    const ldapServers = process.env.LDAP_SERVERS
    if (!ldapServers) {
      throw new Error('LDAP_SERVERS environment variable is required')
    }

    try {
      return JSON.parse(ldapServers) as LdapConfig[]
    } catch (error) {
      throw new Error('Invalid LDAP_SERVERS configuration format')
    }
  }

  async authenticate(email: string, password: string): Promise<LdapUser | null> {
    for (const config of this.configs) {
      try {
        const user = await this.authenticateWithServer(config, email, password)
        if (user) {
          return user
        }
      } catch (error) {
        console.error(`LDAP authentication failed for server ${config.url}:`, error)
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
        connectTimeout: 5000
      })

      client.on('error', (error) => {
        client.destroy()
        reject(error)
      })

      const userDn = `cn=${email},${config.userSearchBase},${config.baseDn}`

      client.bind(userDn, password, (bindError) => {
        if (bindError) {
          client.destroy()
          reject(bindError)
          return
        }

        this.getUserDetails(client, config, email)
          .then((user) => {
            client.destroy()
            resolve(user)
          })
          .catch((error) => {
            client.destroy()
            reject(error)
          })
      })
    })
  }

  private async getUserDetails(
    client: ldap.Client, 
    config: LdapConfig, 
    email: string
  ): Promise<LdapUser> {
    return new Promise((resolve, reject) => {
      const searchBase = `${config.userSearchBase},${config.baseDn}`
      const searchFilter = `(mail=${email})`
      
      const searchOptions: ldap.SearchOptions = {
        scope: 'sub',
        filter: searchFilter,
        attributes: ['displayName', 'mail', 'memberOf']
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

          user.email = this.getAttributeValue(attributes, 'mail') || email
          user.displayName = this.getAttributeValue(attributes, 'displayName') || email
          
          const memberOf = this.getAttributeValues(attributes, 'memberOf')
          user.memberOf = memberOf.map(dn => this.extractGroupName(dn))
        })

        searchResult.on('error', (error) => {
          reject(error)
        })

        searchResult.on('end', () => {
          if (userFound && user.email && user.displayName && user.memberOf) {
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