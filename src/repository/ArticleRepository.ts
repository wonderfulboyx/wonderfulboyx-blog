import fs from 'fs';
import path from 'path';
import {ArticleMetaData, articleMetaDataRequiredKey} from '../model/ArticleMetaData'
import {IArticle} from '../model/Article'

export interface IArticleRepository {
  getAll: () => Promise<IArticle[]>
  getFromSlug: (slug: string) =>  Promise<IArticle>
  getFromFileName: (fileName: string) =>  Promise<IArticle>
}

export class ArticleRepository implements IArticleRepository {
  private static readonly articlesDirectory = path.join(process.cwd(), 'contents', 'articles')

  public async getAll(): Promise<IArticle[]> {
    const fileNames = fs.readdirSync(ArticleRepository.articlesDirectory)
    const allArticlesData = await Promise.all(
      fileNames.map(this.getFromFileName)
    )
    return allArticlesData
  }

  public async getFromSlug(slug: string): Promise<IArticle> {
    const fileName = await ArticleRepository.fileNameFromSlug(slug)
    const article = await this.getFromFileName(fileName)
    return article
  }

  public async getFromFileName(fileName: string): Promise<IArticle> {
    const {metaData} = await import(`../../contents/articles/${fileName}`)
    if (!ArticleRepository.isValidMetaData(metaData)) {
      throw new Error('invalid metaData')
    }
    return {
      fileName,
      slug: ArticleRepository.slugFromFileName(fileName),
      title: metaData.title,
      date: metaData.date,
      metaData: metaData,
    }
  }

  private static isValidMetaData = (metaData: unknown): metaData is ArticleMetaData => {
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

  private static fileNameFromSlug = (slug: string): string => {
    return `${slug}.mdx`
  }

  private static slugFromFileName = (fileName: string): string => {
    return fileName.replace(/\.(mdx)$/, '')
  }
}


