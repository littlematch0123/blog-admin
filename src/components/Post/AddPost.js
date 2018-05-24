import React from 'react'
import PropTypes from 'prop-types'
import PostForm from './PostForm'

const AddPost = ({ match }) => <PostForm match={match} operate="add" />

AddPost.propTypes = {
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default AddPost
