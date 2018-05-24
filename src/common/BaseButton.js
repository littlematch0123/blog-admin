import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PRIMARY_COLOR } from '@/constants/Colors'

const BaseButton = ({ children, ...rest }) => <Button {...rest}>{children}</Button>

BaseButton.propTypes = {
  children: PropTypes.node
}
BaseButton.defaultProps = {
  children: '确定'
}

export default BaseButton

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0 10px;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  line-height: 32px;
  text-align: center;
  color: #fff;
  background: ${PRIMARY_COLOR};
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
  cursor: pointer;
  &:focus {
    outline: none;
  }
`
