import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PRIMARY_COLOR } from '@/constants/Colors'
import BaseButton from './BaseButton'

const ButtonInverted = ({ className, children, onClick, cancelColor, ...rest }) =>
  (
    <StyledButton
      {...rest}
      style={{ color: cancelColor || PRIMARY_COLOR }}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )


ButtonInverted.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  cancelColor: PropTypes.string
}
ButtonInverted.defaultProps = {
  className: '',
  children: '取消',
  cancelColor: ''
}

export default ButtonInverted

const StyledButton = styled(BaseButton)`
  background: transparent;
  box-shadow: none;
`
