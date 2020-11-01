import {mdx} from '@mdx-js/react'
import PrismCodeBlock, {defaultProps, CustomLanguage, Language} from 'prism-react-renderer'
import React, {ReactNode} from 'react'
import {LiveEditor, LiveError, LivePreview, LiveProvider} from 'react-live'
import {isCustomLanguage} from '../plugin/prism'
import styled from "@emotion/styled";
import theme from "../theme";
import {Styled} from 'theme-ui'

interface Props {
  className?: string,
  live?: boolean,
  render?: boolean,
}

const getCustomLanguageFromClassName: (className: string) => CustomLanguage | '' =
  (className) => {
    const lang = className.replace(/language-/, '')
    if (!isCustomLanguage(lang)) {
      console.warn(`className ${className} is not supported language.`)
      return ''
    }

    return lang
  }

const getCode: (node: ReactNode) => string =
  (node) => typeof node === 'string' ? node : node?.toString() ?? ''

const CodeBlock: React.FC<Props> =
  ({children, className, live, render}) => {
    const prismLanguage = className ? getCustomLanguageFromClassName(className) : ''
    const code = getCode(children)

    if (live) {
      return (
        <CodeDiv>
          <LiveProvider
            code={code?.trim()}
            transformCode={_code => '/** @jsx mdx */' + _code}
            scope={{mdx}}
            theme={defaultProps.theme}
          >
            <LivePreview/>
            <LiveEditor/>
            <LiveError/>
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
            <LivePreview/>
          </LiveProvider>
        </CodeDiv>
      )
    }

    return (
      <PrismCodeBlock
        theme={defaultProps.theme}
        Prism={defaultProps.Prism}
        code={code?.trim() ?? ''}
        language={prismLanguage as Language/*
          Language ∈ CustomLanguage なのでこのキャストには問題があるが、Prismを拡張したLanguageに対応させているので動く
            ref: '../plugin/prism'
        */}
      >
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <Styled.pre className={className} style={{...style, padding: '20px', overflow: 'auto'}}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key: i})}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({token, key})} />
                ))}
              </div>
            ))}
          </Styled.pre>
        )}
      </PrismCodeBlock>
    )
  }

const CodeDiv = styled.div`
& pre {
  font-family: ${theme.fonts.monospace};
  overflow-x: auto;
  & code {
    color: inherit;
  }
}

& code {
  font-family: ${theme.fonts.monospace};
  font-size: inherit;
}
`

export default CodeBlock
