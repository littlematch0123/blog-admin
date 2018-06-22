import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '@/utils/history'
import AlertWithButtonBox from '@/components/Alert/AlertWithButtonBox'
import { deleteCommentAsync } from './module'

class DeleteComment extends React.Component {
  onDelete = () => {
    const { deleteCommentAsync, match, location } = this.props
    const { commentId, postId } = match.params
    const { state } = location
    deleteCommentAsync({ id: commentId }).then(() => {
      if (state) {
        history.push({ pathname: `/posts/${postId}/comments`, state: { url: state.url } })
      } else {
        history.push({ pathname: `/posts/${postId}/comments` })
      }
    }, () => {
      history.push(`/posts/${postId}/comments`)
    })
  }
  render() {
    return <AlertWithButtonBox text="确定要删除吗?" onConfirmClick={this.onDelete} />
  }
}

DeleteComment.propTypes = {
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    state: PropTypes.object
  }).isRequired,
  deleteCommentAsync: PropTypes.func.isRequired
}
export default connect(null, { deleteCommentAsync })(DeleteComment)
