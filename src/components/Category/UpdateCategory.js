import React from 'react'
import PropTypes from 'prop-types'
import CategoryForm from './CategoryForm'

const UpdateCategory = ({ match }) => <CategoryForm match={match} operate="update" />
UpdateCategory.propTypes = {
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default UpdateCategory
