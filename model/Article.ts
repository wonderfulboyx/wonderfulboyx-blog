import {compareDesc as dateCompareDesc, parseISO} from "date-fns";

export interface IArticle {
  slug: string
  fileName: string
  title: string
  date: string
  metaData: MetaData
}

export const requiredMetaDataKey = ['title', 'date'] as const

export type MetaData =
  { [key in typeof requiredMetaDataKey[number]]: string } &
  { ogImage?: string, tags?: string[] }

export const compareDesc = (left: IArticle, right: IArticle): number => {
  return dateCompareDesc(parseISO(left.date), parseISO(right.date))
}
