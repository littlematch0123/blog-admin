import React from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'

const AddComment = ({ match, location }) => <CommentForm match={match} location={location} operate="add" />

AddComment.propTypes = {
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

export default AddComment
