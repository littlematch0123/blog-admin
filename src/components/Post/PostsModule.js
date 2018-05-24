import { BASE_POST_URL } from '@/constants/API'
import { createSelector } from 'reselect'
import async from '@/utils/async'
import history from '@/utils/history'
import { getCategoriesByNumber } from '@/components/Category/module'
import { getNumberWithoutPostPositiveZero, getAncestorNumber } from '@/utils/util'

// action-types
export const SET_POSTS_FILTER = 'SET_POSTS_FILTER'
export const LOAD_POSTS = 'LOAD_POSTS'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

// state
const initialState = {
  filter: null,
  docs: []
}

// action
export const loadPostsAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    data,
    url: `${BASE_POST_URL}`,
    doHideAlert: true,
    success(result) {
      const { docs } = result
      dispatch({ type: LOAD_POSTS, docs })
      resolve(docs)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const addPostAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    data,
    method: 'post',
    url: `${BASE_POST_URL}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: ADD_POST, doc })
      history.push(`/posts/${doc._id}`)
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const updatePostAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    data,
    method: 'put',
    url: `${BASE_POST_URL}/${data._id}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: UPDATE_POST, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const deletePostAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    method: 'delete',
    url: `${BASE_POST_URL}/${data.id}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: DELETE_POST, doc })
      history.push('/posts')
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const setPostsFilter = filter => dispatch => new Promise(resolve => {
  resolve()
  dispatch({ type: SET_POSTS_FILTER, filter })
})

// reducer
const post = (state = initialState, action) => {
  switch (action.type) {
  case SET_POSTS_FILTER:
    return { ...state, filter: action.filter }
  case LOAD_POSTS:
    return { ...state, docs: action.docs }
  case ADD_POST:
    return { ...state, docs: [action.doc, ...state.docs] }
  case UPDATE_POST:
    return {
      ...state,
      docs: state.docs.map(t => {
        if (t._id === action.doc._id) {
          return action.doc
        }
        return t
      })
    }
  case DELETE_POST:
    return { ...state, docs: state.docs.filter(t => t._id !== action.doc._id) }
  default:
    return state
  }
}

export default post

// selector
export const getPosts = state => state.posts.docs

export const getPostsById = createSelector(getPosts, datas =>
  datas.reduce((item, t) => {
    item[t._id] = t
    return item
  }, {})
)

export const getPostsFilter = state => state.posts.filter

export const getPostCount = createSelector(getPosts, posts => (posts.length))

export const getPostsByFilter = createSelector([getPosts, getPostsFilter],
  (datas, filter) => {
    if (filter === null) return datas
    const reg = new RegExp(`^${getNumberWithoutPostPositiveZero(filter)}`)
    return datas.filter(item => item.category && String(item.category.number).match(reg))
  }
)

export const getPostsWithTitleData = createSelector(
  [getPosts, getCategoriesByNumber], (posts, categoryObj) => {
    if (posts.length === 0) return posts
    if (Object.keys(categoryObj).length === 0) return posts
    return (
      posts.map(t => ({
        ...t,
        titleData: t.category ? categoryObj[getAncestorNumber(t.category.number)].name : ''
      }))
    )
  }
)

export const getRecommendedPostsWithTitleData = createSelector(getPostsWithTitleData,
  datas => datas.filter(t => t.recommend).sort((a, b) => a.index - b.index))
