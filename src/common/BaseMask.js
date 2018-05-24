import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BaseMask = ({ className, ...rest }) => <Wrap className={className} {...rest} />

BaseMask.propTypes = {
  className: PropTypes.string
}
BaseMask.defaultProps = {
  className: null
}


export default BaseMask

const Wrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .4);
`
