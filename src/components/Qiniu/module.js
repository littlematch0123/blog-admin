import { BASE_QINIU_URL } from '@/constants/API'
import async from '@/utils/async'

// action-types
export const LOAD_TOKEN = 'LOAD_TOKEN'
// state
const initialState = {
  doc: ''
}

// action
export const loadTokenAsync = () => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    url: `${BASE_QINIU_URL}`,
    doHideAlert: true,
    success(result) {
      const { doc } = result
      dispatch({ type: LOAD_TOKEN, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})

// reducer
const qiniu = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_TOKEN:
    return { doc: action.doc }
  default:
    return state
  }
}

export default qiniu

// selector
export const getToken = state => state.qiniu.doc
