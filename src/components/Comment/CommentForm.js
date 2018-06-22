import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import BaseFullScreen from '@/common/BaseFullScreen'
import ButtonBox from '@/common/ButtonBox'
import BaseTextArea from '@/common/BaseTextArea'
import BaseMask from '@/common/BaseMask'
import { getUserId } from '@/components/Auth/module'
import { addCommentAsync, updateCommentAsync } from './module'

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    const { operate, location } = props
    if (operate === 'update' && location.state) {
      const { content } = location.state.comment
      this.state = { content }
    } else {
      this.state = { content: '' }
    }
  }
  componentDidMount() {
    const { operate, location, match } = this.props
    if (operate === 'update' && !location.state) {
      history.push(`/posts/${match.params.postId}/comments`)
    }
  }
  onConfirmClick = () => {
    const { content } = this.state
    const { updateCommentAsync, operate, addCommentAsync, match, userId, location } = this.props
    const { postId, commentId } = match.params
    const { state } = location
    if (operate === 'update') {
      updateCommentAsync({ id: commentId, content }).then(() => {
        if (state.url) {
          history.push({ pathname: `/posts/${postId}/comments`, state: { url: state.url } })
        } else {
          history.push({ pathname: `/posts/${postId}/comments` })
        }
      })
    } else {
      addCommentAsync({ id: commentId, content, post: postId, user: userId }).then(() => {
        if (state) {
          history.push({ pathname: `/posts/${postId}/comments`, state: { url: state.url } })
        } else {
          history.push({ pathname: `/posts/${postId}/comments` })
        }
      })
    }
  }
  render() {
    const { content } = this.state
    return (
      <StyledScreen>
        <BaseMask />
        <Inner>
          <StyledTextArea
            value={content}
            onChange={e => this.setState({ content: e.target.value })}
            placeholder="在此处写下评论..."
          />
          <ButtonBox onConfirmClick={this.onConfirmClick} />
        </Inner>
      </StyledScreen>
    )
  }
}
CommentForm.propTypes = {
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
  operate: PropTypes.string.isRequired,
  updateCommentAsync: PropTypes.func.isRequired,
  addCommentAsync: PropTypes.func.isRequired,
  userId: PropTypes.string
}
CommentForm.defaultProps = {
  userId: null
}
const mapStateToProps = state => ({
  userId: getUserId(state)
})
export default connect(mapStateToProps, { addCommentAsync, updateCommentAsync })(CommentForm)

const StyledScreen = styled(BaseFullScreen)`
  z-index: 1;
  background: #fff;
`

const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: 1200px;
  height: 220px;
  padding: 10px;
  margin: 0 auto;
  border-radius: 4px;
  background: #fff;
`

const StyledTextArea = styled(BaseTextArea)`
  flex: 1;
  height: auto;
  margin: 10px 0;
  color: rgba(0, 0, 0, .8);
`
