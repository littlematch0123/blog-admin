// action-types
export const SHOW_LOADING = 'SHOW_LOADING'
export const HIDE_LOADING = 'HIDE_LOADING'
export const SHOW_ALERTTEXT = 'SHOW_ALERTTEXT'
export const HIDE_ALERTTEXT = 'HIDE_ALERTTEXT'

// state
const initialState = {
  doShowLoading: false,
  alertText: ''
}

// action
export const showLoading = () => ({ type: SHOW_LOADING })
export const hideLoading = () => ({ type: HIDE_LOADING })
export const showAlertText = doc => ({ type: SHOW_ALERTTEXT, doc })
export const hideAlertText = () => ({ type: HIDE_ALERTTEXT })

// reducer
const alert = (state = initialState, action) => {
  switch (action.type) {
  case SHOW_LOADING:
    return { ...state, doShowLoading: true }
  case HIDE_LOADING:
    return { ...state, doShowLoading: false }
  case SHOW_ALERTTEXT:
    return { doShowLoading: false, alertText: action.doc }
  case HIDE_ALERTTEXT:
    return { doShowLoading: false, alertText: null }
  default:
    return state
  }
}

export default alert

// selector
export const getDoShowLoading = state => state.alert.doShowLoading
export const getAlertText = state => state.alert.alertText
