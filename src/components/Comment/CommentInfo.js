import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import BaseAvatar from '@/common/BaseAvatar'
import history from '@/utils/history'
import { getComments, updateCommentAsync } from './module'

class CommentInfo extends React.Component {
  static toggle = (() => {
    let counter = 0
    return () => {
      counter = (counter + 1) % 2
      return counter
    }
  })()
  static getDerivedStateFromProps(nextProps) {
    const { comments } = nextProps
    if (comments.length) return { comments }
    return null
  }
  constructor(props) {
    super(props)
    this.state = { comments: [] }
  }
  onEnterComment = t => {
    const { updateCommentAsync, location } = this.props
    if (t.post) {
      !t.viewed && updateCommentAsync({ id: t._id, viewed: true })
      history.push({ pathname: `/posts/${t.post._id}/comments`, state: { url: location.pathname } })
    }
  }
  onSortByUserName = () => {
    const { comments } = this.state
    if (CommentInfo.toggle()) {
      this.setState({ comments: comments.sort((a, b) => a.user.username.localeCompare(b.user.username, 'zh-Hans-CN')) })
    } else {
      this.setState({ comments: comments.sort((a, b) => -a.user.username.localeCompare(b.user.username, 'zh-Hans-CN')) })
    }
  }
  onSortByTime = () => {
    const { comments } = this.state
    if (CommentInfo.toggle()) {
      this.setState({ comments: comments.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt)) })
    } else {
      this.setState({ comments: comments.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)) })
    }
  }
  onSortByStatus = () => {
    const { comments } = this.state
    if (CommentInfo.toggle()) {
      this.setState({ comments: comments.sort((a, b) => a.viewed - b.viewed) })
    } else {
      this.setState({ comments: comments.sort((a, b) => b.viewed - a.viewed) })
    }
  }
  render() {
    const { comments } = this.props
    if (!comments.length) return false
    const PostItem = t => {
      if (!t.post) {
        return <InfoPost>该文章已删除</InfoPost>
      }
      if (!t.viewed) {
        return <InfoPost>{t.post.title}</InfoPost>
      }
      return t.post.title
    }
    return (
      <Wrap>
        <BaseTable>
          <tbody>
            <Tr>
              <UserName onClick={this.onSortByUserName}>用户</UserName>
              <Time onClick={this.onSortByTime}>时间</Time>
              <Title onClick={this.onSortByStatus}>文章</Title>
            </Tr>
          </tbody>
        </BaseTable>
        <Main>
          <Table>
            <tbody>
              {comments.map(t => (
                <Tr key={t._id} onClick={() => this.onEnterComment(t)}>
                  <UserName><StyledAvatar>{t.user ? t.user.username : '删'}</StyledAvatar></UserName>
                  <Time>{new Date(t.createdAt).toLocaleDateString()}</Time>
                  <Title>
                    <Post>{PostItem(t)}</Post>
                  </Title>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Main>
      </Wrap>
    )
  }
}

CommentInfo.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateCommentAsync: PropTypes.func.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    path: PropTypes.string,
    search: PropTypes.string
  }).isRequired
}

const mapStateToProps = state => ({
  comments: getComments(state)
})
export default connect(mapStateToProps, { updateCommentAsync })(CommentInfo)

const Wrap = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  font-size: 1.1em;
  line-height: 50px;
  text-align: center;
  vertical-align: middle;
`
const Table = styled.table`
  width: 100%;
  table-layout:fixed;
`
const BaseTable = Table.extend`
  line-height: 30px;
`

const Tr = styled.tr`
  border-bottom: 1px solid #eee;
`

const Td = styled.td`
  cursor: pointer;
`
const Time = Td.extend`
  width: 24%;
`
const UserName = Td.extend`
  width: 12%;
`
const Title = Td.extend`
  width: 64%;
`

const Post = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Main = styled.div`
  height: calc(100% - 50px);
  overflow: auto;
`

const StyledAvatar = styled(BaseAvatar)`
  display: inline-block;
`

const InfoPost = styled.span`
  color: rgba(255, 0, 0, .6);
`
