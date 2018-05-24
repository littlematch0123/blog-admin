import { createSelector } from 'reselect'
import { BASE_POST_URL } from '@/constants/API'
import async from '@/utils/async'
import { getCategoryNumbers } from '@/utils/util'
import { getCategoriesByNumber } from '@/components/Category/module'
// action-types
export const LOAD_POST = 'LOAD_POST'

// state
const initialState = null

// action
export const loadPostAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    url: `${BASE_POST_URL}/${data.id}`,
    doHideAlert: true,
    success(result) {
      const { doc } = result
      dispatch({ type: LOAD_POST, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})

// reducer
const post = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_POST:
    return action.doc
  default:
    return state
  }
}

export default post

// selector
export const getPost = state => state.post

export const getPostWithTitleDatas = createSelector([getPost, getCategoriesByNumber],
  (post, categoryObj) => {
    if (post == null) return null
    if (Object.keys(categoryObj).length === 0) return post
    return {
      ...post,
      text: decodeURIComponent(escape(window.atob(post.content))),
      titleDatas: post.category ?
        getCategoryNumbers(post.category.number)
          .map(t => ({ key: t, value: categoryObj[t].name })) : []
    }
  }
)
