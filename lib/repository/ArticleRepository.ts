import fs from 'fs';
import path from 'path';
import {Article} from "../../model/Article";
import {ArticleMetaData, articleMetaDataRequiredKey} from '../../model/ArticleMetaData'

export interface IArticleRepository {
  getAll: () => Promise<Article[]>
  getFromSlug: (slug: string) =>  Promise<Article>
  getFromFileName: (fileName: string) =>  Promise<Article>
}

export class ArticleRepository implements IArticleRepository {
  private static readonly articlesDirectory = path.join(process.cwd(), 'contents', 'articles')

  public async getAll(): Promise<Article[]> {
    const fileNames = fs.readdirSync(ArticleRepository.articlesDirectory)
    const allArticlesData = await Promise.all(
      fileNames.map(this.getFromFileName)
    )
    return allArticlesData
  }

  public async getFromSlug(slug: string): Promise<Article> {
    const fileName = await this.fileNameFromSlug(slug)
    const article = await this.getFromFileName(fileName)
    return article
  }

  public async getFromFileName(fileName: string): Promise<Article> {
    const {metaData} = await import(`../../contents/articles/${fileName}`)
    if (!this.isValidMetaData(metaData)) {
      throw new Error('invalid metaData')
    }
    return Article.fromInterface({
      fileName,
      slug: this.slugFromFileName(fileName),
      title: metaData.title,
      date: metaData.date,
      metaData: metaData,
    })
  }

  private isValidMetaData(metaData: unknown): metaData is ArticleMetaData {
    if (typeof metaData !== 'object' || metaData === null) {
      throw new Error('metaData is not object')
    }
    if (!articleMetaDataRequiredKey.every(requiredKey => requiredKey in metaData)) {
      throw new Error('metaData must contain requiredKey')
    }
    const isValueTypeValid = Object.entries(metaData).every(([key, value]) => {
      if (key !== 'tags') {
        return typeof value === 'string'
      }
      if (key === 'tags' && Array.isArray(value)) {
        return value.every(elm => typeof elm === 'string')
      }
      return false
    })
    if (!isValueTypeValid) {
      throw new Error('invalid metaData')
    }
    return true
  }

  private fileNameFromSlug = (slug: string): string => {
    return `${slug}.mdx`
  }

  private slugFromFileName = (fileName: string): string => {
    return fileName.replace(/\.(mdx)$/, '')
  }
}


