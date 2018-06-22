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
import { Add } from '@/common/BaseImg'
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
  onAddComment = BasePostUrl => {
    const { location } = this.props
    const { state } = location
    if (state) {
      history.push({ pathname: `${BasePostUrl}/comments/add`, state: { url: state.url } })
    } else {
      history.push({ pathname: `${BasePostUrl}/comments/add` })
    }
  }
  onDeleteComment = (t, BasePostUrl) => {
    const { location } = this.props
    const { state } = location
    if (state) {
      history.push({ pathname: `${BasePostUrl}/comments/${t._id}/delete`, state: { url: state.url } })
    } else {
      history.push({ pathname: `${BasePostUrl}/comments/${t._id}/delete` })
    }
  }
  onUpdateComment = (t, BasePostUrl) => {
    const { location } = this.props
    const { state } = location
    if (state) {
      history.push({ pathname: `${BasePostUrl}/comments/${t._id}/update`, state: { url: state.url, comment: t } })
    } else {
      history.push({ pathname: `${BasePostUrl}/comments/${t._id}/update`, state: { comment: t } })
    }
  }
  render() {
    const { comments, match, location } = this.props
    const len = comments.length
    const { state } = location
    const { postId } = match.params
    const BasePostUrl = `/posts/${postId}`
    return (
      <StyledScreen>
        <Header>
          <BaseBack onClick={() => { state ? history.push(`${state.url}`) : history.push(BasePostUrl) }} />
          <AddBox onClick={() => this.onAddComment(BasePostUrl)}><Add />添加评论</AddBox>
        </Header>
        <Inner>
          <BaseTitle>评论列表</BaseTitle>
          <CommentBox>
            {comments.length === 0 ? '暂无评论' : comments.map((t, i) => (
              <CommentItem key={t._id}>
                <ItemHeader>
                  <AvatarBox>
                    {t.user ? <BaseAvatar>{t.user.username}</BaseAvatar>
                      : <StyledAvatar>删</StyledAvatar>}
                    <Time>{new Date(t.createdAt).toLocaleDateString()}</Time>
                  </AvatarBox>
                  <BtnBox>
                    <StyledBtn onClick={() => this.onUpdateComment(t, BasePostUrl)}>编辑</StyledBtn>
                    <StyledBtn onClick={() => this.onDeleteComment(t, BasePostUrl)}>删除</StyledBtn>
                  </BtnBox>
                  <Floor>{len - i}楼</Floor>
                </ItemHeader>
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
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    path: PropTypes.string,
    search: PropTypes.string
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  line-height: 30px;
`
const AddBox = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  & > svg {
    margin-right: 6px;
  }
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
const ItemHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`

const StyledAvatar = styled(BaseAvatar)`
  background-color: ${ERROR_COLOR};
`

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
