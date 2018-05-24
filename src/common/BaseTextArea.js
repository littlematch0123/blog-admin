import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { DARK_LINE_COLOR } from '@/constants/Colors'

const BaseTextArea = ({ value, onChange, ...rest }) =>
  <TextArea {...rest} value={value} onChange={onChange} />

BaseTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}
BaseTextArea.defaultProps = {
  value: ''
}
export default BaseTextArea

const TextArea = styled.textarea`
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-height: 140px;
  padding: 6px 20px;
  border: 2px solid ${DARK_LINE_COLOR};
  border-radius: 4px;
  resize: none;
  font-size: 1.1em;
  line-height: 16px;
  letter-spacing: 1px;
`
