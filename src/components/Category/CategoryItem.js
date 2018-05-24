import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import BaseSwipeItem from '@/common/BaseSwipeItem'

class CategoryItem extends React.Component {
  constructor(props) {
    super(props)
    const { data } = props
    this.baseUrl = `/categories/${data.number}`
  }
  onClick = () => {
    const { data } = this.props
    // 如果存在子级，则点击可进入该类别界面
    data.count && history.push(`/categories/${data.number}`)
  }
  onAddClick = () => {
    history.push(`${this.baseUrl}/add`)
  }
  onUpdateClick = () => {
    history.push(`${this.baseUrl}/update`)
  }
  onDeleteClick = () => {
    history.push(`${this.baseUrl}/delete`)
  }
  render() {
    const { data, index, length } = this.props
    const showBox = (
      <React.Fragment>
        <Index>{index}、</Index>
        <Title>{data.name}</Title>
        <Count>{data.count}</Count>
      </React.Fragment>
    )
    const controlDatas = [
      { title: '添加', key: 'add', onClick: this.onAddClick },
      { title: '编辑', key: 'update', onClick: this.onUpdateClick },
      {
        title: '删除',
        key: 'delete',
        onClick: this.onDeleteClick,
        hidenCondition: !(index === length && data.count === 0)
      }
    ]
    return (
      <StyledSwipeItem
        showChildren={showBox}
        controlDatas={controlDatas}
        onClick={this.onClick}
      />
    )
  }
}
CategoryItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    number: PropTypes.number,
    name: PropTypes.string
  }).isRequired,
  index: PropTypes.number,
  length: PropTypes.number
}
CategoryItem.defaultProps = {
  index: null,
  length: null
}
export default CategoryItem

const StyledSwipeItem = styled(BaseSwipeItem)`
  line-height: 60px;
`
const Index = styled.i`
  position: absolute;
  margin-left: 10px;
`
const Title = styled.h3`
  padding: 0 30px;
  overflow: hidden;
  font-weight: bold;
  font-size: 1.1em;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, .8);
  cursor: pointer;
`
const Count = styled.span`
  margin-right: 10px;
  font-size: 1.1em;
  color: rgba(0, 0, 0, .7);
`
