import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PRIMARY_COLOR } from '@/constants/Colors'

const BaseBadge = ({ className, children, ...rest }) =>
  (<Wrap className={className} {...rest} >{children}</Wrap>)

BaseBadge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}
BaseBadge.defaultProps = {
  className: '',
  children: null
}

export default BaseBadge

const Wrap = styled.span`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  line-height: 18px;
  text-align: center;
  color: #fff;
  background-color: ${PRIMARY_COLOR};
`
