/** @jsx jsx */
import {jsx, Styled} from 'theme-ui'
import React from "react";
import Link from "next/link";
import {format, parseISO} from "date-fns";
import theme from "../theme";
import variables from "../theme/variables";
import {IArticle} from "../model/Article";

interface Props {
  articleList: IArticle[]
}

const ArticleList: React.FC<Props> = ({articleList}) => {
  return (
    <ul>
      {articleList.map(({slug, metaData}) => (
        <li key={slug}
            sx={{
              padding: 2,
              borderBottom: `1px ${theme.colors.border} solid`,
              '&:hover': {
                background: theme.colors.hoverBlock,
                transition: variables.transitions.hoverBlock,
              }
            }}>
          <Link href="/articles/[id]" as={`/articles/${slug}`}><a>
            <div>
              <h2 sx={{
                color: 'primary',
                fontSize: 3
              }}>
                {metaData.title}
              </h2>
              <small>
                {format(parseISO(metaData.date), 'yyyy年MM月dd日')}
              </small>
            </div>
          </a></Link>
        </li>
      ))}
    </ul>
  )
}

export default ArticleList
