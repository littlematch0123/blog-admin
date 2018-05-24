import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import history from '@/utils/history'
import BaseButton from './BaseButton'
import ButtonInverted from './ButtonInverted'

const ButtonBox = ({ className, textForConfirm, textForCancle, onConfirmClick, ...rest }) =>
  (
    <Wrap className={className} {...rest} >
      <BaseButton onClick={onConfirmClick}>{textForConfirm}</BaseButton>
      <ButtonInverted onClick={() => { history.goBack() }}>{textForCancle}</ButtonInverted>
    </Wrap>
  )

ButtonBox.propTypes = {
  className: PropTypes.string,
  textForConfirm: PropTypes.string,
  textForCancle: PropTypes.string,
  onConfirmClick: PropTypes.func.isRequired
}
ButtonBox.defaultProps = {
  className: '',
  textForConfirm: '确定',
  textForCancle: '取消'
}

export default ButtonBox

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  & button {
    width: auto;
  }
`
