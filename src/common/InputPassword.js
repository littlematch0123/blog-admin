import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Visibility, VisibilityOff } from './BaseImg'
import BaseInput from './BaseInput'

const InputPassword = ({
  className,
  value,
  onChange,
  doShowPassword,
  onChangeStatus,
  textIndent,
  color,
  ...rest
}) =>
  (
    <Wrap className={className} {...rest} >
      <StyledInput
        autoComplete={doShowPassword ? 'new-password' : 'off'}
        id="password"
        textIndent={textIndent}
        color={color}
        value={value}
        onChange={onChange}
        type={doShowPassword ? 'password' : 'text'}
      />
      { doShowPassword ?
        <Visibility onClick={onChangeStatus} />
        : <VisibilityOff onClick={onChangeStatus} />
      }
    </Wrap>
  )

InputPassword.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  doShowPassword: PropTypes.bool,
  textIndent: PropTypes.string,
  color: PropTypes.string
}
InputPassword.defaultProps = {
  className: null,
  textIndent: null,
  color: null,
  doShowPassword: false
}

export default InputPassword

const Wrap = styled.div`
  position: relative;
  height: 30px;
  & > svg {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    fill: rgba(255, 255, 255, .4);
  }
`
const StyledInput = styled(BaseInput)`
  text-indent: ${props => props.textIndent || '0'};
  color: ${props => props.color || '#fff'};
  background: none;
`

