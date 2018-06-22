import { BASE_COMMENT_URL } from '@/constants/API'
import async from '@/utils/async'
import { createSelector } from 'reselect'

// action-types
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_COMMENTS_FILTER = 'SET_COMMENTS_FILTER'

// state
const initialState = {
  filter: null,
  docs: []
}

// action
export const loadCommentsAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    data,
    url: `${BASE_COMMENT_URL}`,
    doHideAlert: true,
    success(result) {
      const { docs } = result
      dispatch({ type: LOAD_COMMENTS, docs })
      resolve(docs)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const addCommentAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    method: 'post',
    data,
    url: `${BASE_COMMENT_URL}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: ADD_COMMENT, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const updateCommentAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    method: 'put',
    data,
    doHideAlert: true,
    url: `${BASE_COMMENT_URL}/${data.id}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: UPDATE_COMMENT, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const deleteCommentAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    method: 'delete',
    url: `${BASE_COMMENT_URL}/${data.id}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: DELETE_COMMENT, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const setCommentsFilter = filter => dispatch => new Promise(resolve => {
  resolve()
  dispatch({ type: SET_COMMENTS_FILTER, filter })
})

// reducer
const comments = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_COMMENTS:
    return { ...state, docs: action.docs }
  case ADD_COMMENT:
    return { ...state, docs: [action.doc, ...state.docs] }
  case UPDATE_COMMENT:
    return {
      ...state,
      docs: state.docs.map(t => {
        if (t._id === action.doc._id) {
          return action.doc
        }
        return t
      })
    }
  case DELETE_COMMENT:
    return { ...state, docs: state.docs.filter(t => t._id !== action.doc._id) }
  case SET_COMMENTS_FILTER:
    return { ...state, filter: action.filter }
  default:
    return state
  }
}

export default comments

// selector
export const getComments = state => state.comments.docs
export const getCommentsFilter = state => state.comments.filter
export const getCommentCount = createSelector(getComments, datas => datas.length)
export const getHaveNotViewedComments = createSelector(getComments, datas => datas.filter(t => !t.viewed))
export const getHaveNotViewedCommentCount = createSelector(getHaveNotViewedComments, datas => datas.length)
export const getCommentById = createSelector([getComments, getCommentsFilter],
  (datas, filter) => (datas.find(t => t._id === filter)))
export const getCommentsByFilter = createSelector([getComments, getCommentsFilter],
  (datas, filter) => (datas.filter(t => t.post && t.post._id === filter)))

export const getCommentsCountByFilter = createSelector(getCommentsByFilter, data => data.length)

export const getUserCommentsByFilter = createSelector([getComments, getCommentsFilter],
  (datas, filter) => (datas.filter(t => t.user && t.user._id === filter)))
