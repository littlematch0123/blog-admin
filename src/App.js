import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '@/assets/global.css'
import Home from '@/components/Home/Home'
import AuthLogin from '@/components/Auth/AuthLogin'
import AlertWithLoading from '@/components/Alert/AlertWithLoading'
import AlertWithText from '@/components/Alert/AlertWithText'
import history from '@/utils/history'
import { setWrapSize, getWrapHeight, getWrapWidth } from '@/components/Size/module'
import { getDoShowLoading, getAlertText, hideAlertText } from '@/components/Alert/module'
import { CLIENT_URL } from '@/constants/API'
import { throttle } from '@/utils/util'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.lastX = null
    this.lastY = null
    this.lastZ = null
  }
  componentDidMount() {
    const { setWrapSize } = this.props
    const { clientHeight, clientWidth } = document.documentElement
    setWrapSize({ clientHeight, clientWidth })
    window.addEventListener('orientationchange', this.setSize)
    window.addEventListener('devicemotion', throttle(this.testShake))
  }
  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.setSize)
    window.removeEventListener('devicemotion', throttle(this.testShake))
  }
  setSize = () => {
    const { setWrapSize, wrapHeight, wrapWidth } = this.props
    setWrapSize({ clientHeight: wrapWidth, clientWidth: wrapHeight })
  }
  testShake = e => {
    const { x, y, z } = e.accelerationIncludingGravity
    const { lastX, lastY, lastZ } = this
    const nowRange = Math.abs(lastX - x) + Math.abs(lastY - y) + Math.abs(lastZ - z)
    if (nowRange > 80) {
      window.location.href = CLIENT_URL
    }
    this.lastX = x
    this.lastY = y
    this.lastZ = z
  }
  render() {
    const { doShowLoading, alertText, hideAlertText } = this.props
    return (
      <React.Fragment>
        { doShowLoading && <AlertWithLoading /> }
        { !!alertText && <AlertWithText text={alertText} onExit={hideAlertText} />}
        <Router history={history} >
          <Switch>
            <Route path="/login" component={AuthLogin} />
            <Route
              path="/"
              render={props => {
                if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
                  return <Home {...props} />
                }
                return <Redirect to="/login" />
              }}
            />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
App.propTypes = {
  hideAlertText: PropTypes.func.isRequired,
  setWrapSize: PropTypes.func.isRequired,
  doShowLoading: PropTypes.bool,
  alertText: PropTypes.string,
  wrapHeight: PropTypes.number,
  wrapWidth: PropTypes.number
}
App.defaultProps = {
  doShowLoading: false,
  alertText: null,
  wrapHeight: null,
  wrapWidth: null
}
const mapStateToProps = state => ({
  doShowLoading: getDoShowLoading(state),
  alertText: getAlertText(state),
  wrapHeight: getWrapHeight(state),
  wrapWidth: getWrapWidth(state)
})
export default connect(mapStateToProps, { setWrapSize, hideAlertText })(App)
