import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getWrapHeight } from '@/components/Size/module'

const BaseFullScreen = ({ className, children, wrapHeight }) =>
  <Wrap className={className} style={{ height: `${wrapHeight}px` }}>{children}</Wrap>

BaseFullScreen.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  wrapHeight: PropTypes.number
}
BaseFullScreen.defaultProps = {
  className: null,
  wrapHeight: null
}

const mapStateToProps = state => ({ wrapHeight: getWrapHeight(state) })

export default connect(mapStateToProps)(BaseFullScreen)

const Wrap = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  margin: 0 auto;
`
