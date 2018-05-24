import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BaseTitle = ({ className, children }) => <Title className={className}>{children}</Title>

BaseTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
BaseTitle.defaultProps = {
  className: ''
}

export default BaseTitle

const Title = styled.h1`
  align-self: center;
  padding: 6px 0;
  font-weight: normal;
  font-size: 1.6em;
  line-height: 2;
  text-align: center;
`
