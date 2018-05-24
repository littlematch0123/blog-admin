import { BASE_LIKE_URL } from '@/constants/API'
import async from '@/utils/async'
import { createSelector } from 'reselect'

// action-types
export const LOAD_LIKES = 'LOAD_LIKES'
export const SET_LIKES_FILTER = 'SET_LIKES_FILTER'

// state
const initialState = {
  filter: null,
  docs: []
}

// action
export const loadLikesAsync = () => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    url: `${BASE_LIKE_URL}`,
    doHideAlert: true,
    success(result) {
      const { docs } = result
      dispatch({ type: LOAD_LIKES, docs })
      resolve(docs)
    },
    fail(err) {
      reject(err)
    }
  })
})

export const setLikesFilter = filter => dispatch => new Promise(resolve => {
  resolve()
  dispatch({ type: SET_LIKES_FILTER, filter })
})

// reducer
const likes = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_LIKES:
    return { ...state, docs: action.docs }
  case SET_LIKES_FILTER:
    return { ...state, filter: action.filter }
  default:
    return state
  }
}

export default likes

// selector
export const getLikes = state => state.likes.docs
export const getLikesFilter = state => state.likes.filter

export const getLikesByFilter = createSelector([getLikes, getLikesFilter],
  (datas, filter) => (datas.filter(t => t.post && t.post._id === filter)))

export const getLikesCountByFilter = createSelector(getLikesByFilter, data => data.length)

export const getUserLikesByFilter = createSelector([getLikes, getLikesFilter],
  (datas, filter) => (datas.filter(t => t.user && t.user._id === filter)))
