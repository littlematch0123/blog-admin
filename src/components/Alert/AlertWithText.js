import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AlertInner from './AlertInner'

const AlertWithText = ({ className, text, onExit, ...rest }) =>
  (
    <AlertInner className={className} {...rest}>
      <Title>{text}</Title>
      <Exit onClick={onExit}>&times;</Exit>
    </AlertInner>
  )

AlertWithText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onExit: PropTypes.func.isRequired
}
AlertWithText.defaultProps = {
  className: '',
  text: '确定'
}

export default AlertWithText

const Title = styled.h2`
  float: left;
  box-sizing: border-box;
  width: calc(100% - 32px);
  padding: 4px 0;
  font-size: 1.2em;
  cursor: default;
`
const Exit = styled.span`
  float: right;
  box-sizing: border-box;
  width: 32px;
  padding: 2px 6px;
  font-size: 26px;
  cursor: pointer;
`
