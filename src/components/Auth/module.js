import { BASE_AUTH_URL } from '@/constants/API'
import async from '@/utils/async'
import history from '@/utils/history'

// action-types
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

// state
const initialState = {
  token: null,
  user: null
}

// action
export const loginAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    data,
    url: `${BASE_AUTH_URL}`,
    method: 'post',
    doHideAlert: true,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { token, user } = result
      // 将用户信息保存到sessionStorage中
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', JSON.stringify(user))
      // 跳转到首页
      history.push('/')
      dispatch({ type: LOGIN, doc: result })
      resolve(result)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const loginByStorage = () => dispatch => {
  (
    dispatch({
      type: LOGIN,
      doc: {
        token: sessionStorage.getItem('token'),
        user: JSON.parse(sessionStorage.getItem('user'))
      }
    })
  )
}

export const logout = () => {
  // 删除sessionStorage中的用户信息
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  // 跳转到登录页
  history.push('/login')
  return { type: LOGOUT }
}

// reducer
const auth = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN: {
    const { token, user } = action.doc
    return { token, user }
  }
  case LOGOUT:
    return { token: null, user: null }
  default:
    return state
  }
}

export default auth

// selector

export const getUserId = state => state.auth.user && state.auth.user._id
