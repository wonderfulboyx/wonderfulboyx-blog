const theme = {
  useLocalStorage: false,
  initialColorModeName: 'light',
  useColorSchemeMediaQuery: true,
  space: [
    0, 4, 8, 16, 32, 64, 128, 256, 512
  ],
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64
  ],
  colors: {
    text: '#566b78',
    light: '#666',
    background: '#fff',
    primary: '#222',
    secondary: '#609',
    headerBg: '#222',
    headerText: '#fff',
    hoverBlock: '#eee',
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
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
  },
  styles: {
    root: {
      fontFamily: 'body',
      color: 'text',
      bg: 'background',
    },
    h1: {
      fontSize: [5],
      color: 'primary',
    },
    h2: {
      fontSize: [4],
      color: 'primary',
      marginTop: 4
    },
    h3: {
      fontSize: [3],
      color: 'primary',
      marginTop: 3
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
    p: {
      lineHeight: 1.5,
      fontFamily: 'body',
      fontWeight: 'body',
      padding: '.5rem 0',
    },
    pre: {
      fontSize: 2
    }
  },
  sizes: {
    container: '50rem'
  },
  text: {
    default: {
      color: 'text',
      fontSize: 3,
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
  }
}

export default theme
