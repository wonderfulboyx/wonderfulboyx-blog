import { AppProps } from "next/app";
import React from "react";
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import '../styles/destyle.css'

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
