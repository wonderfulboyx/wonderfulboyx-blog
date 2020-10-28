/** @jsx jsx */
import {MDXProvider} from "@mdx-js/react"
import {GetStaticPaths, GetStaticProps} from "next"
import dynamic from 'next/dynamic'
import Head from "next/head"
import React from "react"
import {jsx, Styled} from 'theme-ui'
import CodeBlock from '../../components/CodeBlock'
import Date from '../../components/Date'
import Layout from '../../components/Layout'
import {ArticleRepository} from '../../lib/repository/ArticleRepository'
import {Article} from '../../model/Article'

interface Props {
  article: Article
}

const components = {
  code: CodeBlock,
}

const Post: React.FC<Props> = ({article}) => {
  const {title, fileName, date, metaData} = article
  const MDXContent = dynamic(() => import(`../../contents/articles/${fileName}`))

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        {metaData.ogImage && <meta
          property="og:image"
          content={metaData.ogImage}
        />}
        <meta name="og:title" content={title}/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <header sx={{paddingBottom: 4}}>
        <Styled.h1 sx={{paddingBottom: 1}}>{title}</Styled.h1>
        <div sx={{color: 'light'}}>
          <Date dateString={date}/>
        </div>
      </header>
      <article>
        <MDXProvider components={components}>
          <MDXContent/>
        </MDXProvider>
      </article>
    </Layout>
  )
}

export default Post

// ==== Next.js API ====
type UrlQuery = { slug: string }

const articleRepository = new ArticleRepository()

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const articles = await articleRepository.getAll()
  const paths = articles.map(article => {
    return {
      params: {slug: article.slug}
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<Props, UrlQuery> =
  async ({params}) => {
    if (!params) {
      throw new Error('staticProps undefined')
    }
    const article = await articleRepository.getFromSlug(params.slug)
    return {
      props: {
        article
      }
    }
  }
