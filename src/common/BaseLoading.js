import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { PRIMARY_COLOR } from '@/constants/Colors'

const BaseLoading = ({ className, ...rest }) =>
  (
    <Svg {...rest} className={className} height="50" width="50" viewBox="0 0 50 50" >
      <Circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
    </Svg>
  )

BaseLoading.propTypes = {
  className: PropTypes.string
}
BaseLoading.defaultProps = {
  className: null
}

export default BaseLoading

const progressCircularRotate = keyframes`
  100% { transform: rotate(360deg); }
`
const progressCircularDash = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -120px;
  }
`
const Svg = styled.svg`
  color: ${PRIMARY_COLOR};
  animation: ${progressCircularRotate} 1.4s linear infinite;
`
const Circle = styled.circle`
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  stroke: currentColor;
  stroke-linecap: round;
  animation: ${progressCircularDash} 1.4s ease-in-out infinite;
`
