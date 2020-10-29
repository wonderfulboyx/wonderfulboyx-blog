import {Language, Prism} from 'prism-react-renderer';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      Prism: typeof Prism
    }
  }
}

declare global {
  interface Window {
    Prism: typeof Prism
  }
}

const additionalLanguage = ['ruby', 'erb'] as const

declare module 'prism-react-renderer' {
  export type CustomLanguage = Language | typeof additionalLanguage[number]
}

export const setPrismToGlobalWindow = (): void => {
  (typeof global !== 'undefined' ? global : window).Prism = Prism
  additionalLanguage.forEach((lang) => {
    require(`prismjs/components/prism-${lang}`)
  })
}

export const isPrismLanguage = (str: string): str is Language => {
  const defaultLanguage = Object.keys(Prism.languages)
  return defaultLanguage.concat(additionalLanguage).includes(str)
}
