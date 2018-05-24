import { BASE_CATEGORY_URL } from '@/constants/API'
import { createSelector } from 'reselect'
import async from '@/utils/async'
import history from '@/utils/history'
import {
  getRegExpForChildrenCategoriesByNumber,
  getParentNumber,
  getNumberWithoutPostPositiveZero,
  getNumber
} from '@/utils/util'

// action-types
export const SET_CATEGORIES_FILTER = 'SET_CATEGORIES_FILTER'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'

// state
const initialState = {
  filter: null,
  docs: []
}
// action
export const loadCategoriesAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    data,
    url: `${BASE_CATEGORY_URL}`,
    doHideAlert: true,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { docs } = result
      dispatch({ type: LOAD_CATEGORIES, docs })
      resolve(docs)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const addCategoryAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    data,
    method: 'post',
    url: `${BASE_CATEGORY_URL}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: ADD_CATEGORY, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
    }
  })
})
export const updateCategoryAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    data,
    method: 'put',
    url: `${BASE_CATEGORY_URL}/${data.number}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: UPDATE_CATEGORY, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
      history.push('/categories')
    }
  })
})
export const deleteCategoryAsync = data => dispatch => new Promise((resolve, reject) => {
  async({
    dispatch,
    method: 'delete',
    url: `${BASE_CATEGORY_URL}/${data.number}`,
    headers: { Authorization: sessionStorage.getItem('token') },
    success(result) {
      const { doc } = result
      dispatch({ type: DELETE_CATEGORY, doc })
      resolve(doc)
    },
    fail(err) {
      reject(err)
      history.push('/categories')
    }
  })
})

export const setCategoriesFilter = filter => dispatch => new Promise(resolve => {
  resolve()
  dispatch({ type: SET_CATEGORIES_FILTER, filter })
})

// reducer
const category = (state = initialState, action) => {
  switch (action.type) {
  case SET_CATEGORIES_FILTER:
    return { ...state, filter: action.filter }
  case LOAD_CATEGORIES:
    return { ...state, docs: action.docs }
  case ADD_CATEGORY:
    return { ...state, docs: [...state.docs, action.doc] }
  case UPDATE_CATEGORY:
    return {
      ...state,
      docs: state.docs.map(t => {
        if (t.number === action.doc.number) {
          return action.doc
        }
        return t
      })
    }
  case DELETE_CATEGORY:
    return { ...state, docs: state.docs.filter(t => t.number !== action.doc.number) }
  default:
    return state
  }
}

export default category

// selector
export const getCategories = state => state.categories.docs

export const getRecommendedCategories = createSelector(getCategories,
  datas => datas.filter(t => t.recommend).sort((a, b) => a.index - b.index))

export const getCategoriesFilter = state => state.categories.filter

export const getCategoryCount = createSelector(getCategories, datas => datas.length)

export const getCategoriesByNumber = createSelector(getCategories, datas =>
  datas.reduce((item, t) => {
    item[t.number] = t
    return item
  }, {})
)

export const getCategoryByFilter = createSelector([getCategories, getCategoriesFilter],
  (datas, filter) => {
    const temp = datas.filter(data => data.number === filter)[0]
    const reg = getRegExpForChildrenCategoriesByNumber(temp && temp.number)
    return { ...temp, count: datas.filter(t => String(t.number).match(reg)).length }
  }
)

export const getCategoryParentNumberByFilter = createSelector(getCategoriesFilter,
  filter => (getParentNumber(filter)))

export const getChildrenCategoriesByFilter = createSelector([getCategories, getCategoriesFilter],
  (datas, filter) => {
    const reg = getRegExpForChildrenCategoriesByNumber(filter)
    return datas.filter(t => String(t.number).match(reg)).map(data => {
      const reg = getRegExpForChildrenCategoriesByNumber(data.number)
      return { ...data, count: datas.filter(t => String(t.number).match(reg)).length }
    })
  }
)

export const getRootCategories = createSelector(getCategories, datas => (
  datas.filter(t => Number(String(t.number).slice(2)) === 0).map(data => {
    const reg = getRegExpForChildrenCategoriesByNumber(data.number)
    return { ...data, count: datas.filter(t => String(t.number).match(reg)).length }
  })
))

export const getNewChildCategoryNumberByNumber = createSelector(getCategoryByFilter, data => {
  if (data.number == null) return NaN
  const temp = getNumberWithoutPostPositiveZero(data.number)
  // 如果相等，说明类别已经到达最深层级，无法再新增子元素。用NaN表示假值
  if (temp === String(data.number)) return NaN
  return getNumber(String(Number(`${temp}00`) + data.count + 1))
})
