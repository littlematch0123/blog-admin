import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { PRIMARY_BG_COLOR } from '@/constants/Colors'
import BaseBack from '@/common/BaseBack'
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseTitle from '@/common/BaseTitle'
import BreadCrumb from '@/common/BreadCrumb'
import BaseArticle from '@/common/BaseArticle'
import { Like, Comment, Update, Delete, Image } from '@/common/BaseImg'
import history from '@/utils/history'
import { getCommentsCountByFilter, setCommentsFilter } from '@/components/Comment/module'
import { getLikesCountByFilter, setLikesFilter } from '@/components/Like/module'
import { loadPostAsync, getPostWithTitleDatas } from './PostModule'

class ShowPost extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { setLikesFilter, setCommentsFilter, match } = nextProps
    const { id } = match.params
    setLikesFilter(id)
    setCommentsFilter(id)
    return null
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const { loadPostAsync, match } = this.props
    const { id } = match.params
    loadPostAsync({ id })
  }
  render() {
    const { post, match, commentsCount, likesCount, location } = this.props
    const { id } = match.params
    const { state } = location
    if (post === null) return false
    const { titleDatas, title, text } = post
    return (
      <StyledScreen>
        <Header>
          <BaseBack onClick={() => { state ? history.push(`${state.url}`) : history.push('/posts') }} />
          <ControlBox>
            <Control onClick={() => { history.push(`/posts/${id}/uploadimg`) }}><Image /><br />配图</Control>
            <Control onClick={() => { history.push(`/posts/${id}/update`) }}><Update /><br />编辑</Control>
            <Control onClick={() => { history.push(`/posts/${id}/delete`) }}><Delete /><br />删除</Control>
            <Control onClick={() => { history.push(`/posts/${id}/likes`) }}><Like /><br />喜欢 {likesCount}</Control>
            <Control onClick={() => { history.push(`/posts/${id}/comments`) }}><Comment /><br />评论 {commentsCount}</Control>
          </ControlBox>
        </Header>
        <Article>
          <BaseTitle>{title}</BaseTitle>
          {!!titleDatas && <StyledCrumb datas={titleDatas} />}
          <BaseArticle text={text} />
        </Article>
      </StyledScreen>
    )
  }
}
ShowPost.propTypes = {
  loadPostAsync: PropTypes.func.isRequired,
  commentsCount: PropTypes.number,
  likesCount: PropTypes.number,
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    path: PropTypes.string,
    search: PropTypes.string
  }).isRequired,
  post: PropTypes.shape({
    category: PropTypes.object,
    comments: PropTypes.array,
    content: PropTypes.string,
    likes: PropTypes.array,
    title: PropTypes.string,
    _id: PropTypes.string,
    updatedAt: PropTypes.string,
    createdAt: PropTypes.string
  })
}
ShowPost.defaultProps = {
  post: null,
  commentsCount: null,
  likesCount: null
}
const mapStateToProps = state => ({
  post: getPostWithTitleDatas(state),
  commentsCount: getCommentsCountByFilter(state),
  likesCount: getLikesCountByFilter(state)
})
export default connect(mapStateToProps, {
  loadPostAsync,
  setLikesFilter,
  setCommentsFilter
})(ShowPost)

const StyledScreen = styled(BaseFullScreen)`
  padding: 10px;
  background: ${PRIMARY_BG_COLOR};
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
`
const ControlBox = styled.ul`
  display: flex;
  text-align: center;
`
const Control = styled.li`
  flex-shrink: 0;
  padding: 0 10px;
  cursor: pointer;
`
const Article = styled.article`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  height: calc(100% - 50px);
  padding: 14px;
  margin-top: 10px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
`
const StyledCrumb = styled(BreadCrumb)`
  justify-content: flex-end;
  line-height: 30px;
  color: rgba(0, 0, 0, .6);
`
