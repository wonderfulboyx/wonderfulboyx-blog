import {compareDesc as dateCompareDesc, parseISO} from "date-fns";
import {ArticleMetaData} from "./ArticleMetaData";

export interface IArticle {
  slug: string
  fileName: string
  title: string
  date: string
  metaData: ArticleMetaData
}

const compareDesc = (left: IArticle, right: IArticle): number => {
  return dateCompareDesc(parseISO(left.date), parseISO(right.date))
}

const Article = {
  compareDesc
}

export default Article

