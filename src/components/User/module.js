import { BASE_USER_URL } from '@/constants/API'
import async from '@/utils/async'
import { createSelector } from 'reselect'

// action-types
export const LOAD_USERS = 'LOAD_USERS'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_USERS_FILTER = 'SET_USERS_FILTER'

// state
const initialState = {
  filter: null,
  docs: []
}

// action
export const loadUsersAsync = () => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    url: `${BASE_USER_URL}`,
    doHideAlert: true,
    success(result) {
      const { docs } = result
      dispatch({ type: LOAD_USERS, docs })
      resolve(docs)
    },
    fail(err) {
      reject(err)
    }
  })
})

export const updateUserAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    data,
    method: 'put',
    url: `${BASE_USER_URL}/${data._id}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: UPDATE_USER, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const setUsersFilter = filter => dispatch => new Promise(resolve => {
  resolve()
  dispatch({ type: SET_USERS_FILTER, filter })
})

// reducer
const users = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_USERS:
    return { ...state, docs: action.docs }
  case SET_USERS_FILTER:
    return { ...state, filter: action.filter }
  case UPDATE_USER:
    return {
      ...state,
      docs: state.docs.map(t => {
        if (t._id === action.doc._id) {
          return action.doc
        }
        return t
      })
    }
  default:
    return state
  }
}

export default users

// selector
export const getUsers = state => state.users.docs
export const getUsersFilter = state => state.users.filter

export const getUserCount = createSelector(getUsers, datas => datas.length)

export const getUsersByFilter = createSelector([getUsers, getUsersFilter],
  (datas, filter) => (datas.filter(t => t.post && t.post._id === filter)))

