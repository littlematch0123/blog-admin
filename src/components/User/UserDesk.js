import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '@/utils/history'
import { getUserLikesByFilter, setLikesFilter } from '@/components/Like/module'
import { getUserCommentsByFilter, setCommentsFilter } from '@/components/Comment/module'
import { DARK_COLOR, PRIMARY_BG_COLOR } from '@/constants/Colors'

class UserDesk extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { setLikesFilter, setCommentsFilter, match } = nextProps
    const { id } = match.params
    setLikesFilter(id)
    setCommentsFilter(id)
    return null
  }
  constructor(props) {
    super(props)
    const { location } = this.props
    if (location.search === '?comment') {
      this.state = { titles: ['点赞的文章', '评论的文章'], index: 1 }
    } else {
      this.state = { titles: ['点赞的文章', '评论的文章'], index: 0 }
    }
  }

  render() {
    const { likes, comments, location } = this.props
    const { index, titles } = this.state
    const ArticleItem = t => {
      if (t.post) {
        return (
          <ShowItem
            key={t._id}
            onClick={() => { history.push({ pathname: `/posts/${t.post._id}`, state: { url: location.pathname } }) }}
          >
            <Time>{new Date(t.createdAt).toLocaleDateString()}</Time>
            <Title>{t.post.title}</Title>
          </ShowItem>
        )
      }
      return (
        <ShowItem key={t._id}>
          <Time>{new Date(t.createdAt).toLocaleDateString()}</Time>
          <ExtendedTitle>该文章已删除</ExtendedTitle>
        </ShowItem>
      )
    }
    return (
      <Wrap>
        <List>
          {titles.map((item, i) =>
            <Item key={item} className={index === i ? 'active' : ''} onClick={() => { this.setState({ index: i }) }}>{item}</Item>
          )}
        </List>
        <Article>
          {!index ? likes.map(t => ArticleItem(t)) : comments.map(t => ArticleItem(t))}
        </Article>
      </Wrap>
    )
  }
}

UserDesk.propTypes = {
  likes: PropTypes.arrayOf(PropTypes.object),
  comments: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    path: PropTypes.string,
    search: PropTypes.string
  }).isRequired
}
UserDesk.defaultProps = {
  likes: [],
  comments: []
}
const mapStateToProps = state => ({
  likes: getUserLikesByFilter(state),
  comments: getUserCommentsByFilter(state)
})
export default connect(mapStateToProps, { setLikesFilter, setCommentsFilter })(UserDesk)


const Wrap = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  background: ${PRIMARY_BG_COLOR};
`
const List = styled.ul`
  line-height: 0px;
  line-height: 40px;
  text-align: center;
  column-count: 2;
  cursor: pointer;
`
const Item = styled.li`
  border-radius: 4px;
  color: rgba(0, 0, 0, .8);
  background: rgba(255, 255, 255, .4);
  &.active{
    border-radius: 4px;
    color: #fff;
    background: ${DARK_COLOR};
  }
`
const Article = styled.ul`
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  height: calc(100% - 100px);
  padding: 14px;
  margin-top: 10px;
  border-radius: 6px;
  overflow: auto;
  font-size: 1em;
  background: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
`
const ShowItem = styled.li`
  display: flex;
  padding: 0 10px;
  line-height: 40px;
  & > time {
    margin-right: 10px;
  }
  &:nth-of-type(odd) {
    background: ${PRIMARY_BG_COLOR};
  }
`
const Time = styled.time`
  width: 60px;
`
const Title = styled.span`
  flex: 1;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`
const ExtendedTitle = Title.extend`
  color: rgba(255, 0, 0, .6);
`
