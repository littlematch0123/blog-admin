import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BreadCrumb = ({ datas, ...rest }) =>
  (
    <List {...rest} >
      {datas.map(t => <Item key={t.key}>{t.value}</Item>)}
    </List>
  )
BreadCrumb.propTypes = {
  datas: PropTypes.arrayOf(PropTypes.object).isRequired
}
export default BreadCrumb

const List = styled.ol`
  display: flex;
  overflow: auto;
`
const Item = styled.li`
  flex-shrink: 0;
  margin: 0 4px;
  &:after {
    position: relative;
    left: 4px;
    content: '/';
  }
  &:last-child:after {
    content: '';
  }
`
