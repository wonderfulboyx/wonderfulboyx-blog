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
import {IArticle} from "../../model/Article";
import ArticleRepository from "../../lib/repository/ArticleRepository";

interface Props {
  article: IArticle
}

const components = {
  code: CodeBlock,
}

const Post: React.FC<Props> = ({article}) => {
  const {title, fileName, date} = article
  const MDXContent = dynamic(() => import(`../../contents/articles/${fileName}`))

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            title
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
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

export const getStaticPaths: GetStaticPaths<UrlQuery> = async () => {
  const articles = await ArticleRepository.getAll()
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
    const article = await ArticleRepository.getFromSlug(params.slug)
    return {
      props: {
        article
      }
    }
  }
