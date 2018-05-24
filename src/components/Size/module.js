// action-types
export const SET_SIZE = 'SET_SIZE'

// action
export const setWrapSize = doc => ({ type: SET_SIZE, doc })

// state
const initialState = {
  clientHeight: null,
  clientWidth: null
}

// reducer
const size = (state = initialState, action) => {
  switch (action.type) {
  case SET_SIZE: {
    const { clientHeight, clientWidth } = action.doc
    return { clientHeight, clientWidth }
  }
  default:
    return state
  }
}

export default size

// selector
export const getWrapHeight = state => state.size.clientHeight

export const getWrapWidth = state => state.size.clientWidth
