import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CategoryItem from './CategoryItem'
import { getRootCategories } from './module'

const CategoryRootList = ({ rootCategories }) =>
  <Wrap>{rootCategories.map((t, i) => <CategoryItem data={t} index={i + 1} key={t._id} />)}</Wrap>

CategoryRootList.propTypes = {
  rootCategories: PropTypes.arrayOf(PropTypes.object)
}
CategoryRootList.defaultProps = {
  rootCategories: []
}
const mapStateToProps = state => ({
  rootCategories: getRootCategories(state)
})
export default connect(mapStateToProps)(CategoryRootList)

const Wrap = styled.section`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`
