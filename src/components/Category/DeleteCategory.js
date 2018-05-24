import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getParentNumber } from '@/utils/util'
import history from '@/utils/history'
import AlertWithButtonBox from '@/components/Alert/AlertWithButtonBox'
import { deleteCategoryAsync } from './module'

class DeleteCategory extends React.Component {
  onDelete = () => {
    const { deleteCategoryAsync, match } = this.props
    const number = Number(match.params.id)
    deleteCategoryAsync({ number }).then(() => {
      history.push(`/categories/${getParentNumber(number)}`)
    })
  }
  render() {
    return <AlertWithButtonBox text="确定要删除吗?" onConfirmClick={this.onDelete} />
  }
}

DeleteCategory.propTypes = {
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  deleteCategoryAsync: PropTypes.func.isRequired
}
export default connect(null, { deleteCategoryAsync })(DeleteCategory)
