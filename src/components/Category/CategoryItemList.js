import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import { Add, Back } from '@/common/BaseImg'
import CategoryItem from './CategoryItem'
import {
  setCategoriesFilter,
  getChildrenCategoriesByFilter,
  getCategoryByFilter,
  getCategoryParentNumberByFilter
} from './module'

class CategoryItemList extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { setCategoriesFilter, match } = nextProps
    setCategoriesFilter(Number(match.params.id))
    return null
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { categories, category, categoryNumber, match } = this.props
    const { id } = match.params
    const url = categoryNumber ? `/categories/${categoryNumber}` : '/categories'
    const name = category ? category.name : ''
    return (
      <Wrap>
        <Header>
          <IconBox onClick={() => { history.push(url) }}><Back />{name}</IconBox>
          <IconBox onClick={() => { history.push(`/categories/${id}/add`) }}><Add />添加分类</IconBox>
        </Header>
        <ul>
          {categories.map((t, i) =>
            <li key={t._id}><CategoryItem data={t} index={i + 1} length={categories.length} /></li>)}
        </ul>

      </Wrap>
    )
  }
}
CategoryItemList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object),
  categoryNumber: PropTypes.number,
  category: PropTypes.shape({
    _id: PropTypes.string,
    posts: PropTypes.array,
    number: PropTypes.number,
    description: PropTypes.string
  }),
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}
CategoryItemList.defaultProps = {
  categories: null,
  category: null,
  categoryNumber: null
}
const mapStateToProps = state => ({
  category: getCategoryByFilter(state),
  categories: getChildrenCategoriesByFilter(state),
  categoryNumber: getCategoryParentNumberByFilter(state)
})
export default connect(mapStateToProps, { setCategoriesFilter })(CategoryItemList)

const Wrap = styled.section`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`
const IconBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  cursor: pointer;
  & > svg {
    margin-right: 6px;
    fill: rgba(0, 0, 0, .7);
  }
`
