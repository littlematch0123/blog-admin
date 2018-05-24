import React from 'react'
import PropTypes from 'prop-types'
import PostForm from './PostForm'

const UpdatePost = ({ match }) => <PostForm match={match} operate="update" />

UpdatePost.propTypes = {
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default UpdatePost
