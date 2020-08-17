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
  const mod = await import(`../../contents/articles/${fileName}`)
  if (typeof mod !== 'object' || mod === null) {
    throw new Error('module undefined')
  }
  if (!mod.metaData) {
    throw new Error('metaData undefined')
  }
  return {
    fileName,
    slug: slugFromFileName(fileName),
    title: mod.metaData.title,
    date: mod.metaData.date,
    metaData: mod.metaData,
  }
}


const ArticleRepository = {
  getAll,
  getFromSlug,
  getFromFileName
}

export default ArticleRepository

