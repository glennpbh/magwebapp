/**
 * Index table used by product one box search
 */
export interface ProductLookup {
  keyword: string
  keywordSx?: string
  key1: string
  key2?: string
  columnRef: number
  withdrawn: number
}
