import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DARK_BG_COLOR, DARK_LINE_COLOR } from '@/constants/Colors'
import BaseButton from './BaseButton'

const ButtonWithAuthWidth = ({ children, ...rest }) =>
  <StyledButton {...rest}>{children}</StyledButton>

ButtonWithAuthWidth.propTypes = {
  children: PropTypes.node
}
ButtonWithAuthWidth.defaultProps = {
  children: '取消'
}

export default ButtonWithAuthWidth

const StyledButton = styled(BaseButton)`
  flex-shrink: 0;
  width: auto;
  padding: 0 8px;
  border: 1px solid ${DARK_LINE_COLOR};
  color: rgba(0, 0, 0, .6);
  background: ${DARK_BG_COLOR};
  box-shadow: none;
`
