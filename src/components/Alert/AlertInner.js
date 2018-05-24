import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BaseMask from '@/common/BaseMask'
import BaseFullScreen from '@/common/BaseFullScreen'

const AlertInner = ({ className, children, ...rest }) =>
  (
    <StyledScreen className={className} {...rest}>
      <BaseMask />
      <Inner>{children}</Inner>
    </StyledScreen>
  )

AlertInner.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
AlertInner.defaultProps = {
  className: ''
}

export default AlertInner

const StyledScreen = styled(BaseFullScreen)`
  z-index: 3;
`

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  box-sizing: border-box;
  min-width: 180px;
  padding: 16px;
  margin: 100px auto 0;
  border-radius: 4px;
  line-height: 22px;
  text-align: center;
  color: rgba(255, 255, 255, .8);
  background-color: rgba(0, 0, 0, .3);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, .2), 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12);
  transform: translateX(-50%);

`
