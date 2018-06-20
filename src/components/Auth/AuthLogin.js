import React from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Logo } from '@/common/BaseImg'
import BaseTitle from '@/common/BaseTitle'
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseInput from '@/common/BaseInput'
import InputPassword from '@/common/InputPassword'
import BaseButton from '@/common/BaseButton'
import ButtonInverted from '@/common/ButtonInverted'
import { DARK_COLOR } from '@/constants/Colors'
import { loginAsync } from './module'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      doShowPassword: true
    }
  }
  onChangeStatus = () => {
    this.setState(prevState => ({ doShowPassword: !prevState.doShowPassword }))
  }
  onEnter = e => {
    if (e.keyCode === 13) {
      this.onSubmit()
    }
  }
  onButtonClick = () => {
    this.onSubmit()
  }
  onSubmit = () => {
    const { username, password } = this.state
    const { loginAsync } = this.props
    username && password && loginAsync({ username, password })
  }
  onVisitorLogin = () => {
    const { loginAsync } = this.props
    loginAsync({ username: '测', password: '0' })
  }
  render() {
    const { username, password, doShowPassword } = this.state
    return (
      <StyledScreen>
        <Inner onKeyUp={this.onEnter}>
          <Logo height="60" width="60" />
          <BaseTitle>后台博客管理系统</BaseTitle>
          <form onSubmit={e => { e.preventDefault() }}>
            <Box>
              <Label htmlFor="username">用户名：</Label>
              <StyledInput
                id="username"
                value={username}
                onChange={e => { this.setState({ username: e.target.value }) }}
              />
            </Box>
            <Box>
              <Label htmlFor="password">&nbsp;密&nbsp;&nbsp;码&nbsp;：</Label>
              <InputPassword
                color="rgba(255, 255, 255, 0.4);"
                textIndent="3em"
                value={password}
                onChange={e => { this.setState({ password: e.target.value }) }}
                doShowPassword={doShowPassword}
                onChangeStatus={this.onChangeStatus}
              />
            </Box>
            <StyledButton onClick={this.onButtonClick}>登&nbsp;录</StyledButton>
            <StyledButtonInverted onClick={this.onVisitorLogin}>游客登录</StyledButtonInverted>
          </form>
          <Introduction>小火柴的蓝色理想</Introduction>
        </Inner>
      </StyledScreen>
    )
  }
}
Login.propTypes = {
  loginAsync: PropTypes.func.isRequired
}
export default connect(null, { loginAsync })(Login)

const StyledScreen = styled(BaseFullScreen)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  background-color: ${DARK_COLOR};
`

const Inner = styled.main`
  position: relative;
  box-sizing: border-box;
  width: 80%;
  max-width: 600px;
  height: 80%;
  max-height: 500px;
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  color: rgba(255, 255, 255, .4);
  background-color: rgba(255, 255, 255, .1);
`
const StyledInput = styled(BaseInput)`
  margin: 10px 0;
  text-indent: 3em;
  color: rgba(255, 255, 255, .4);
  background: none;
`
const StyledButton = styled(BaseButton)`
  width: 84%;
  max-width: 600px;
  margin: 20px auto;
`
const Box = styled.div`
  position: relative;
`
const Label = styled.label`
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
`
const typing = keyframes`
  0% {width: 0;}
`

const caret = keyframes`
  50% {border-color: transparent;}
`

const Introduction = styled.p`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  width: 9em;
  margin: 0 auto;
  overflow: hidden;
  border-right: 1px solid;
  white-space: nowrap;
  animation: ${typing} 4s steps(9) infinite, ${caret} .5s steps(1) infinite;
`

const StyledButtonInverted = styled(ButtonInverted)`
  text-align: right;
  text-decoration: underline;
  color: rgba(255, 255, 255, .4);
`
