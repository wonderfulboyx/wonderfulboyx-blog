import { mdx } from '@mdx-js/react'
import PrismCodeBlock, { defaultProps, Language as PrismLanguage, Prism } from 'prism-react-renderer'
import React, { ReactNode } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import styled from "@emotion/styled";

interface Props {
  className?: string,
  live?: boolean,
  render?: boolean,
}

const isPrismLanguage: (str: string) => str is PrismLanguage =
  (str): str is PrismLanguage => Object.keys(Prism.languages).includes(str)

const getPrismLanguage: (className: string | undefined) => PrismLanguage =
  (className) => {
    const defaultLanguage = 'markdown'

    if (!className) {
      return defaultLanguage
    }

    const lang = className.replace(/language-/, '')
    if (!isPrismLanguage(lang)) {
      console.warn(`className ${className} is not supported language. automatically specified markdown`)
      return defaultLanguage
    }

    return lang
  }

const getCode: (node: ReactNode) => string =
  (node) => typeof node === 'string' ? node : node?.toString() ?? ''

const CodeBlock: React.FC<Props> =
  ({ children, className, live, render }) => {
    const prismLanguage = getPrismLanguage(className)
    const code = getCode(children)

    if (live) {
      return (
        <CodeDiv>
          <LiveProvider
            code={code?.trim()}
            transformCode={_code => '/** @jsx mdx */' + _code}
            scope={{ mdx }}
            theme={defaultProps.theme}
          >
            <LivePreview />
            <LiveEditor />
            <LiveError />
          </LiveProvider>
        </CodeDiv>
      )
    }

    if (render) {
      return (
        <CodeDiv>
          <LiveProvider
            code={code}
            theme={defaultProps.theme}
          >
            <LivePreview />
          </LiveProvider>
        </CodeDiv>
      )
    }

    return (
      <PrismCodeBlock theme={defaultProps.theme} Prism={defaultProps.Prism} code={code?.trim() ?? ''} language={prismLanguage}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: '20px' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </PrismCodeBlock>
    )
  }

const CodeDiv = styled.div`
  background-color: ${defaultProps.theme.plain.backgroundColor};
  color: ${defaultProps.theme.plain.color};
  font-style: ${defaultProps.theme.plain.fontStyle};
  font-weight: ${defaultProps.theme.plain.fontWeight};
  margin-top: 40px;
`

export default CodeBlock
