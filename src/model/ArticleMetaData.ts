export const articleMetaDataRequiredKey = ['title', 'date'] as const

export type ArticleMetaData =
  { [key in typeof articleMetaDataRequiredKey[number]]: string } &
  { ogImage?: string, tags?: string[] }
