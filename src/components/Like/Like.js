import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseBack from '@/common/BaseBack'
import BaseTitle from '@/common/BaseTitle'
import BaseAvatar from '@/common/BaseAvatar'
import { ERROR_COLOR } from '@/constants/Colors'
import { getLikesByFilter, setLikesFilter } from './module'

class CommentList extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { setLikesFilter, match } = nextProps
    setLikesFilter(match.params.postId)
    return null
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { likes, match } = this.props
    const { postId } = match.params
    const BasePostUrl = `/posts/${postId}`
    return (
      <StyledScreen>
        <BaseBack onClick={() => { history.push(BasePostUrl) }}>返回文章</BaseBack>
        <Inner>
          <BaseTitle>点赞列表</BaseTitle>
          <CommentBox>
            {likes.map((t, i) => (
              <CommentItem key={t._id}>
                <AvatarBox>
                  {t.user ? <BaseAvatar>{t.user.username}</BaseAvatar>
                    : <StyledAvatar>删</StyledAvatar>}
                  <Time>{new Date(t.createdAt).toLocaleDateString()}</Time>
                </AvatarBox>
                <Floor>第{i + 1}赞</Floor>
              </CommentItem>
            ))}
          </CommentBox>
        </Inner>
      </StyledScreen>
    )
  }
}

CommentList.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}
CommentList.defaultProps = {
  likes: null
}
const mapStateToProps = state => ({
  likes: getLikesByFilter(state)
})
export default connect(mapStateToProps, { setLikesFilter })(CommentList)

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  margin: 10px 0;
  border-bottom: 2px dashed #eee;
`

const StyledAvatar = styled(BaseAvatar)`
  background-color: ${ERROR_COLOR};
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
