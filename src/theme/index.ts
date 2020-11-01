import presetBase from './preset-base'

const theme = {
  ...presetBase,
  useLocalStorage: false,
  initialColorModeName: 'light',
  useColorSchemeMediaQuery: true,
  fontSizes: [
    12, 14, 16, 22, 29, 40, 48, 64
  ],
  fonts: {
    ...presetBase.fonts,
    body:
      '"Helvetica Neue", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'inherit',
  },
  colors: {
    ...presetBase.colors,
    text: '#333',
    light: '#666',
    background: '#fff',
    primary: '#222',
    blockBg: '#ddd',
    border: '#e1e4e8',
    modes: {
      dark: {
        text: '#fff',
        background: '#222',
        primary: '#0cf',
        secondary: '#90c',
      },
    },
  },
  styles: {
    ...presetBase.styles,
    root: {
      fontFamily: 'body',
      color: 'text',
      bg: 'background',
    },
    h1: {
      fontSize: [5],
      color: 'text',
      lineHeight: '1.5em',
    },
    h2: {
      fontSize: [4],
      color: 'text',
      marginTop: 4,
      lineHeight: '1.5em',
    },
    h3: {
      fontSize: [3],
      color: 'text',
      marginTop: 3,
      lineHeight: '1.5em',
    },
    a: {
      color: 'primary',
      textDecoration: 'underline',
      cursor: 'pointer',
      ':hover': {
        color: 'primary',
        textDecoration: 'none',
      },
    },
  }
}

export default theme
