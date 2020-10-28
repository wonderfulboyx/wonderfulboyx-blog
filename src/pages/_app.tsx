import { AppProps } from "next/app";
import React, {useEffect} from "react";
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import '../styles/destyle.css'
import {Router} from "next/router";
import * as gatag from '../plugin/gtag'
import {NextRouterHandler} from '../types/NextRouterHandler'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if (!gatag.existsGaId) {
      return
    }

    const handleRouteChange: NextRouterHandler = path => {
      gatag.pageview(path)
    }

    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
