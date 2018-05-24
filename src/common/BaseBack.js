import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Back } from '@/common/BaseImg'

const BaseBack = ({ children, ...rest }) => (<Wrap {...rest} ><Back />{children}</Wrap>)

BaseBack.propTypes = {
  children: PropTypes.node
}
BaseBack.defaultProps = {
  children: '返回'
}

export default BaseBack

const Wrap = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  cursor: pointer;
  & > svg {
    margin-right: 6px;
  }
`
