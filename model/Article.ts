import {compareDesc as dateCompareDesc, parseISO} from "date-fns";
import {ArticleMetaData} from "./ArticleMetaData";

export interface IArticle {
  slug: string
  fileName: string
  title: string
  date: string
  metaData: ArticleMetaData
}

export class Article implements IArticle {
  public static readonly compareDesc = (left: IArticle, right: IArticle): number => {
    return dateCompareDesc(parseISO(left.date), parseISO(right.date))
  }

  public static readonly fromInterface = (obj: IArticle): Article => {
    return new Article(
      obj.slug,
      obj.fileName,
      obj.title,
      obj.date,
      obj.metaData
    )
  }

  private constructor(
    public readonly slug: string,
    public readonly fileName: string,
    public readonly title: string,
    public readonly date: string,
    public readonly metaData: ArticleMetaData,
  ) {}
}

