import fs from 'fs';
import path from 'path';
import {IArticle, MetaData, requiredMetaDataKey} from "../../model/Article";

const articlesDirectory = path.join(process.cwd(), 'contents', 'articles')

export const getAll = async (): Promise<IArticle[]> => {
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = await Promise.all(
    fileNames.map(getArticleFromFileName)
  )
  return allArticlesData
}

export const getFromSlug = async (slug: string): Promise<IArticle> => {
  const fileName = await fileNameFromSlug(slug)
  const article = await getArticleFromFileName(fileName)
  return article
}

export const getArticleFromFileName = async (fileName: string): Promise<IArticle> => {
  const {metaData} = await import(`../../contents/articles/${fileName}`)
  if (!isValidMetaData(metaData)) {
    throw new Error('invalid metaData')
  }
  return {
    fileName,
    slug: slugFromFileName(fileName),
    title: metaData.title,
    date: metaData.date,
    metaData: metaData,
  }
}

const isValidMetaData = (metaData: any): metaData is MetaData => {
  if (typeof metaData !== 'object' || metaData === null) {
    throw new Error('metaData is not object')
  }
  if (!requiredMetaDataKey.every(requiredKey => requiredKey in metaData)) {
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

const fileNameFromSlug = (slug: string): string => {
  return `${slug}.mdx`
}

const slugFromFileName = (fileName: string): string => {
  return fileName.replace(/\.(mdx)$/, '')
}
