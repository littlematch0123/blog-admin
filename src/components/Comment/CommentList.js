import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseBack from '@/common/BaseBack'
import BaseTitle from '@/common/BaseTitle'
import BaseAvatar from '@/common/BaseAvatar'
import ButtonWithAutoWidth from '@/common/ButtonWithAutoWidth'
import { ERROR_COLOR } from '@/constants/Colors'
import { getCommentsByFilter, setCommentsFilter } from './module'

class CommentList extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { setCommentsFilter, match } = nextProps
    setCommentsFilter(match.params.postId)
    return null
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  onDelete = (t, BasePostUrl) => {
    history.push({ pathname: `${BasePostUrl}/comments/${t._id}/delete`, state: { BasePostUrl } })
  }
  render() {
    const { comments, match } = this.props
    const { postId } = match.params
    const BasePostUrl = `/posts/${postId}`
    return (
      <StyledScreen>
        <BaseBack onClick={() => { history.push(BasePostUrl) }}>返回文章</BaseBack>
        <Inner>
          <BaseTitle>评论列表</BaseTitle>
          <CommentBox>
            {comments.map((t, i) => (
              <CommentItem key={t._id}>
                <Header>
                  <AvatarBox>
                    {t.user ? <BaseAvatar>{t.user.username}</BaseAvatar>
                      : <StyledAvatar>删</StyledAvatar>}
                    <Time>{new Date(t.createdAt).toLocaleDateString()}</Time>
                  </AvatarBox>
                  <StyledBtn onClick={() => this.onDelete(t, BasePostUrl)}>删除</StyledBtn>
                  <Floor>{i + 1}楼</Floor>
                </Header>
                <Paragraph>{t.content}</Paragraph>
              </CommentItem>
            ))}
          </CommentBox>
        </Inner>
      </StyledScreen>
    )
  }
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}
CommentList.defaultProps = {
  comments: null
}
const mapStateToProps = state => ({
  comments: getCommentsByFilter(state)
})
export default connect(mapStateToProps, { setCommentsFilter })(CommentList)

const StyledScreen = styled(BaseFullScreen)`
  padding: 10px;
  background: #eee;
`
const Inner = styled.div`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  max-height: calc(100% - 40px);
  padding: 14px;
  margin-top: 10px;
  border-radius: 6px;
  font-size: 1.1em;
  line-height: 2;
  background: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
  cursor: default;
`
const CommentBox = styled.ul`
  overflow-y: auto;
`
const CommentItem = styled.li`
  position: relative;
  padding-bottom: 10px;
  border-bottom: 2px dashed #eee;
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`

const StyledAvatar = styled(BaseAvatar)`
  background-color: ${ERROR_COLOR};
`

const StyledBtn = styled(ButtonWithAutoWidth)`
  margin: 0 4px;
  font-size: 1em;
  cursor: pointer;
`
const AvatarBox = styled.div`
  display: flex;
  align-items: center;
`
const Time = styled.time`
  margin-left: 6px;
`
const Floor = styled.span`
  display: inline;
`
const Paragraph = styled.p`
  white-space: pre-wrap;
  word-break: break-all;
`
