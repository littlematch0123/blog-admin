import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PRIMARY_LINE_COLOR, DARK_LINE_COLOR } from '@/constants/Colors'

const LinkageSelector = ({ datas, onInput, ...rest }) =>
  (
    <Wrap {...rest} >
      <List>
        {datas.map(t => <Item key={t.key} onClick={() => { onInput(t) }}>{t.value}</Item>)}
      </List>
    </Wrap>
  )

LinkageSelector.propTypes = {
  datas: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInput: PropTypes.func.isRequired
}

export default LinkageSelector

const Wrap = styled.div`
  padding: 10px;
  background: #fff;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
`
const List = styled.ul`
  border: 2px solid ${DARK_LINE_COLOR};
  border-radius: 4px;
`
const Item = styled.li`
  padding: 10px;
  border-top: 1px solid ${PRIMARY_LINE_COLOR};
  line-height: 20px;
  cursor: pointer;
  &:first-child {
    border: none;
  }
`
