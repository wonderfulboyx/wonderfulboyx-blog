import fs from 'fs';
import path from 'path';
import {IArticle} from "../../model/Article";

const articlesDirectory = path.join(process.cwd(), 'contents', 'articles')

const fileNameFromSlug = (slug: string): string => {
  return `${slug}.mdx`
}

const slugFromFileName = (fileName: string): string => {
  return fileName.replace(/\.(mdx)$/, '')
}

const getAll = async (): Promise<IArticle[]> => {
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = await Promise.all(
    fileNames.map(getFromFileName)
  )
  return allArticlesData
}

const getFromSlug = async (slug: string): Promise<IArticle> => {
  const fileName = await fileNameFromSlug(slug)
  const article = await getFromFileName(fileName)
  return article
}

const getFromFileName = async (fileName: string): Promise<IArticle> => {
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

const requiredMetaDataKey = ['title', 'date'] as const
type MetaData =
  { [key in typeof requiredMetaDataKey[number]]: string } &
  Record<string, string>
const isValidMetaData = (metaData: any): metaData is MetaData => {
  if (typeof metaData !== 'object' || metaData === null) {
    throw new Error('metaData is not object')
  }
  if (!requiredMetaDataKey.every(requiredKey => requiredKey in metaData)) {
    throw new Error('metaData must contain requiredKey')
  }
  if (!Object.values(metaData).every(value => typeof value === 'string')) {
    throw new Error('metaData value must be string')
  }
  return true
}


const ArticleRepository = {
  getAll,
  getFromSlug,
  getFromFileName
}

export default ArticleRepository

