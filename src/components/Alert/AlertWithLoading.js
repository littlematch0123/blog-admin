import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BaseLoading from '@/common/BaseLoading'
import AlertInner from './AlertInner'

const AlertWithButtonBox = ({ className, text, ...rest }) =>
  (
    <AlertInner className={className} {...rest}>
      <BaseLoading />
      <Title>{text}</Title>
    </AlertInner>
  )

AlertWithButtonBox.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
}
AlertWithButtonBox.defaultProps = {
  className: '',
  text: '请稍候'
}

export default AlertWithButtonBox

const Title = styled.h2`
  font-weight: bold;
  font-size: 1.2em;
  line-height: 2;
`
