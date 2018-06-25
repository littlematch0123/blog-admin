import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PRIMARY_LINE_COLOR } from '@/constants/Colors'

const BaseFilterList = ({ datas, ...rest }) =>
  (
    <Wrap {...rest}>
      <FilterSetBox>{filterBox}</FilterSetBox>
      <FilteredList>
        {datas.map(t => <Item key={t._id}>{t.value}</Item>)}
      </FilteredList>
    </Wrap>
  )

BaseFilterList.propTypes = {
  children: PropTypes.node
}
BaseFilterList.defaultProps = {
  children: '取消'
}

export default BaseFilterList

const Wrap = styled.section `
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  font-size: 12px;
  line-height: 40px;
`
const FilterSetBox = styled.div `
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ebedf0;
  line-height: 32px;
`
const FilteredList = styled.ul`
  height: calc(100% - 40px);
  overflow: auto;
  line-height: 50px;
`
const Item = styled.li `
  position: relative;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: ${PRIMARY_LINE_COLOR};
    transform: scaleY(.5);
    content: '';
  }
`
