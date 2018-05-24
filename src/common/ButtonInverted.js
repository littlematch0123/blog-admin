import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PRIMARY_COLOR } from '@/constants/Colors'
import BaseButton from './BaseButton'

const ButtonInverted = ({ className, children, onClick, ...rest }) =>
  <StyledButton {...rest} className={className} onClick={onClick}>{children}</StyledButton>

ButtonInverted.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
}
ButtonInverted.defaultProps = {
  className: '',
  children: '取消'
}

export default ButtonInverted

const StyledButton = styled(BaseButton)`
  color: ${PRIMARY_COLOR};
  background: transparent;
  box-shadow: none;
`
