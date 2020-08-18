import {compareDesc as dateCompareDesc, parseISO} from "date-fns";

export interface IArticle {
  slug: string
  fileName: string
  title: string
  date: string
  metaData: Record<string, string>
}

export const compareDesc = (left: IArticle, right: IArticle): number => {
  return dateCompareDesc(parseISO(left.date), parseISO(right.date))
}
