/** @jsx jsx */
import {jsx} from 'theme-ui'
import React from "react";
import Link from "next/link";
import {format, parseISO} from "date-fns";
import theme from "../theme";
import {IArticle} from "../model/Article";
import styled from "@emotion/styled";

interface ContainerProps {
  articleList: IArticle[]
}

interface Props extends ContainerProps {
  className?: string
}

const Component: React.FC<Props> = ({className, articleList}) => {
  return (
    <div className={className}>
      <ul>
        {articleList.map(({slug, metaData}) => (
          <li key={slug} sx={{padding: 2}} className='article-item'>
            <Link href="/articles/[slug]" as={`/articles/${slug}`}>
              <a>
                <div>
                  <h2 sx={{color: 'primary', fontSize: 3}}>
                    {metaData.title}
                  </h2>
                  <small>
                    {format(parseISO(metaData.date), 'yyyy年MM月dd日')}
                  </small>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const StyledComponents = styled(Component)`
& .article-item {
  border-bottom: 1px ${theme.colors.border} solid;
} 
& .article-item:hover {
  background: #eee;
  transition: .1s;
}
`

const ContainerComponent: React.FC<ContainerProps> = (props) => {
  return (<StyledComponents {...props} />)
}

const ArticleList = ContainerComponent

export default ArticleList

