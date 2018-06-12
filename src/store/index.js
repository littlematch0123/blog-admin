import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import auth from '@/components/Auth/module'
import size from '@/components/Size/module'
import alert from '@/components/Alert/module'
import categories from '@/components/Category/module'
import posts from '@/components/Post/PostsModule'
import post from '@/components/Post/PostModule'
import comments from '@/components/Comment/module'
import likes from '@/components/Like/module'
import qiniu from '@/components/Qiniu/module'
import users from '@/components/User/module'

const rootReducer = combineReducers({
  auth,
  size,
  alert,
  categories,
  posts,
  post,
  comments,
  likes,
  qiniu,
  users
})
let store = null
if (process.env.NODE_ENV === 'development') {
  store = createStore(rootReducer, applyMiddleware(thunk, logger))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk))
}

export default store
