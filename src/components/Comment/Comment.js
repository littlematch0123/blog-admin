import React from 'react'
import { Route } from 'react-router-dom'
import CommentList from './CommentList'
import DeleteComment from './DeleteComment'
import AddComment from './AddComment'
import UpdateComment from './UpdateComment'

const Comment = () =>
  (
    <React.Fragment>
      <Route path="/posts/:postId/comments" component={CommentList} />
      <Route path="/posts/:postId/comments/add" component={AddComment} />
      <Route path="/posts/:postId/comments/:commentId/delete" component={DeleteComment} />
      <Route path="/posts/:postId/comments/:commentId/update" component={UpdateComment} />
    </React.Fragment>
  )

export default Comment
