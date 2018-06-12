import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '@/utils/history'
import AlertWithButtonBox from '@/components/Alert/AlertWithButtonBox'
import { deleteCommentAsync } from './module'

class DeleteComment extends React.Component {
  onDelete = () => {
    const { deleteCommentAsync, match, location } = this.props
    const { commentId } = match.params
    const { BasePostUrl } = location.state
    deleteCommentAsync({ id: commentId }).then(() => {
      history.push(`${BasePostUrl}/comments`)
    }, () => {
      history.push(`${BasePostUrl}/comments`)
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
