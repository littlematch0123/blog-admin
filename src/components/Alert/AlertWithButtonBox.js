import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ButtonBox from '@/common/ButtonBox'
import AlertInner from './AlertInner'

const AlertWithButtonBox = ({ text, onConfirmClick, ...rest }) =>
  (
    <StyledAlertInner {...rest}>
      <Title>{text}</Title>
      <ButtonBox onConfirmClick={onConfirmClick} />
    </StyledAlertInner>
  )

AlertWithButtonBox.propTypes = {
  text: PropTypes.string.isRequired,
  onConfirmClick: PropTypes.func.isRequired
}

export default AlertWithButtonBox

const StyledAlertInner = styled(AlertInner)`
  z-index: 2;
  margin-top: 200px;
`
const Title = styled.h2`
  padding: 10px;
  font-weight: bold;
  font-size: 1.2em;
  line-height: 2;
`
