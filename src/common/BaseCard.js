import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BaseCard = ({ children, ...rest }) =>
  (<Wrap {...rest} >{children}</Wrap>)

BaseCard.propTypes = {
  children: PropTypes.node
}
BaseCard.defaultProps = {
  children: null
}

export default BaseCard

const Wrap = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
`
