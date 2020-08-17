import Head from 'next/head';
import React from "react";
import Navbar from "./Navbar";
import {Container} from "@theme-ui/components";

export const siteTitle = 'wonderfulboyxのblog'

const Layout: React.FC = ({children}) => {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="og:title" content={siteTitle}/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <Navbar/>
      <Container p={[3,3,4]}>
        <main>{children}</main>
      </Container>
    </div>)
}

export default Layout
