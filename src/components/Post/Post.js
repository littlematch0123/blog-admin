import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Comment from '@/components/Comment/Comment'
import Like from '@/components/Like/Like'
import PostList from './PostList'
import ShowPost from './ShowPost'
import AddPost from './AddPost'
import UpdatePost from './UpdatePost'
import DeletePost from './DeletePost'
import UploadImgPost from './UploadImgPost'
import SearchPost from './SearchPost'

const Post = () =>
  (
    <Switch>
      <Route exact path="/posts" component={PostList} />
      <Route path="/posts/search" component={SearchPost} />
      <Route path="/posts/add" component={AddPost} />
      <Route exact path="/posts/:id" component={ShowPost} />
      <Route path="/posts/:id/update" component={UpdatePost} />
      <Route path="/posts/:id/uploadimg" component={UploadImgPost} />
      <Route path="/posts/:id/delete" component={DeletePost} />
      <Route path="/posts/:postId/comments" component={Comment} />
      <Route path="/posts/:postId/likes" component={Like} />
    </Switch>
  )

export default Post
