/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from "react"
import Layout, { siteTitle } from '../components/Layout'
import ArticleList from "../components/ArticleList";
import * as ArticleRepository from "../lib/repository/ArticleRepository";
import Article, {IArticle} from "../model/Article";

interface Props {
  allArticlesSorted: IArticle[]
}

const Home: React.FC<Props> = ({ allArticlesSorted }) => {
 return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <header sx={{paddingBottom: [3,3,4]}}>
        <Styled.h1>Recent Articles</Styled.h1>
      </header>
      <section>
        <ArticleList articleList={allArticlesSorted} />
      </section>
    </Layout>
  )
}

export default Home

// ==== Next.js API ====
export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles = await ArticleRepository.getAll()
  return {
    props: {
      allArticlesSorted: articles.sort(Article.compareDesc)
    }
  }
}
