import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import { DARK_LINE_COLOR, PRIMARY_COLOR, PRIMARY_BG_COLOR } from '@/constants/Colors'

const BaseArticle = ({ ...rest, text }) =>
  (<StyledMarkdown {...rest} skipHtml={false} source={text} escapeHtml={false} />)

BaseArticle.propTypes = {
  text: PropTypes.string
}
BaseArticle.defaultProps = {
  text: ''
}

export default BaseArticle

const StyledMarkdown = styled(ReactMarkdown)`
  flex: 1;
  margin-top: 20px;
  overflow-y: auto;
  font-size: 1.1em;
  line-height: 2;
  word-break: break-all;

  & a {
    text-decoration: underline;
  }

  & h2 {
    margin-bottom: 18px;
    border-bottom: 2px solid ${DARK_LINE_COLOR};
    font-size: 1.3em;
    font-weight: normal;
  }

  & h3 {
    margin: 12px 0;
    font-size: 1.2em;
    line-height: 1.2;
    &::after {
      width: 2px;
      padding-left: 6px;
      color: ${PRIMARY_COLOR};
      content: '|';
    }
  }

  & code {
    padding: .2em .4em;
    border-radius: 3px;
    font-size: 90%;
    background: ${PRIMARY_BG_COLOR};
  }

  & pre {
    display: block;
    padding: 1em;
    border: 2px solid ${DARK_LINE_COLOR};
    border-radius: 4px;
    overflow-x: auto;
    line-height: 1.6;
    background: ${PRIMARY_BG_COLOR};
    -webkit-overflow-scrolling: touch;

    & code {
      padding: 0;
      background: none;
    }
  }

  & img {
    max-width: 100%;
  }

  & table {
    width: 100%;
    line-height: 1.5;
    text-align: center;
  }

  & td,
  & th {
    padding: 6px 12px;
    border: 1px solid ${DARK_LINE_COLOR};
  }

  @media screen and (max-width: 320px) {
    & iframe {
      max-width: 272px;
    }
  }
`
