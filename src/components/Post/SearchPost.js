import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '@/utils/history'
import BaseSearchBox from '@/common/BaseSearchBox'
import { getPosts } from './PostsModule'

class SearchPost extends React.Component {
  onInput = t => {
    const { location } = this.props
    history.push({ pathname: `/posts/${t._id}`, state: { url: location.pathname } })
  }
  onBack = () => {
    history.push('/posts')
  }
  render() {
    const { posts } = this.props
    return (
      <BaseSearchBox
        datas={posts}
        onInput={this.onInput}
        onBack={this.onBack}
      />
    )
  }
}


SearchPost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    path: PropTypes.string,
    search: PropTypes.string
  }).isRequired
}
const mapStateToProps = state => ({
  posts: getPosts(state)
})
export default connect(mapStateToProps)(SearchPost)
