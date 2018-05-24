import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PRIMARY_COLOR } from '@/constants/Colors'

const BaseAvatar = ({ className, children, ...rest }) =>
  (<Wrap className={className} {...rest} >{children}</Wrap>)

BaseAvatar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}
BaseAvatar.defaultProps = {
  className: '',
  children: null
}

export default BaseAvatar

const Wrap = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background-color: ${PRIMARY_COLOR};
`
