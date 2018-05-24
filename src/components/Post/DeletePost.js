import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AlertWithButtonBox from '@/components/Alert/AlertWithButtonBox'
import { deletePostAsync } from './PostsModule'

class DeletePost extends React.Component {
  onDelete = () => {
    const { deletePostAsync, match } = this.props
    const { id } = match.params
    deletePostAsync({ id })
  }
  render() {
    return (
      <AlertWithButtonBox text="确定要删除吗?" onConfirmClick={this.onDelete} />
    )
  }
}

DeletePost.propTypes = {
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  deletePostAsync: PropTypes.func.isRequired
}
export default connect(null, { deletePostAsync })(DeletePost)
