import React from 'react'
import { Route } from 'react-router-dom'
import CommentList from './CommentList'
import DeleteComment from './DeleteComment'

const Comment = () =>
  (
    <React.Fragment>
      <Route path="/posts/:postId/comments" component={CommentList} />
      <Route path="/posts/:postId/comments/:commentId/delete" component={DeleteComment} />
    </React.Fragment>
  )

export default Comment
