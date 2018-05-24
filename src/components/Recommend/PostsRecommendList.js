import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import BaseBack from '@/common/BaseBack'
import { getRecommendedPostsWithTitleData } from '@/components/Post/PostsModule'
import PostRecommendItem from './PostRecommendItem'

const PostsRecommendList = ({ posts }) =>
  (
    <Wrap>
      <BaseBack onClick={() => { history.push('/recommends') }}>返回</BaseBack>
      {posts.map((t, i) => <PostRecommendItem key={t._id} data={t} datas={posts} index={i + 1} />)}
    </Wrap>
  )
PostsRecommendList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired
}
const mapStateToProps = state => ({
  posts: getRecommendedPostsWithTitleData(state)
})
export default connect(mapStateToProps)(PostsRecommendList)

const Wrap = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 20px 10px;
  overflow-x: hidden;
  overflow-y: auto;
`
