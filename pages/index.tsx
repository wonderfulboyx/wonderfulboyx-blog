/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from "react"
import Layout, { siteTitle } from '../components/Layout'
import ArticleList from "../components/ArticleList";
import {ArticleRepository} from '../lib/repository/ArticleRepository'
import {Article} from '../model/Article'

interface Props {
  allArticlesSorted: Article[]
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

const articleRepository = new ArticleRepository()

// ==== Next.js API ====
export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles = await articleRepository.getAll()
  return {
    props: {
      allArticlesSorted: articles.sort(Article.compareDesc)
    }
  }
}
