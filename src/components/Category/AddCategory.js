import React from 'react'
import PropTypes from 'prop-types'
import CategoryForm from './CategoryForm'

const AddCategory = ({ match }) => <CategoryForm match={match} operate="add" />
AddCategory.propTypes = {
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default AddCategory
