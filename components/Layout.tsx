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
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
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
