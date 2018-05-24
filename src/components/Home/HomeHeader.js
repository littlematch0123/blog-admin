import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BaseMask from '@/common/BaseMask'
import { Logo, Menu } from '@/common/BaseImg'
import { loadCategoriesAsync, getCategories } from '@/components/Category/module'
import { loadPostsAsync, getPosts } from '@/components/Post/PostsModule'
import { loadLikesAsync, getLikes } from '@/components/Like/module'
import { loadCommentsAsync, getComments } from '@/components/Comment/module'
import { loadUsersAsync, getUsers } from '@/components/User/module'
import { DARK_BG_COLOR } from '@/constants/Colors'
import history from '@/utils/history'
import HomeMenuList from './HomeMenuList'

class HomeHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = { doShowMenuList: false }
  }
  componentDidMount() {
    const {
      loadCategoriesAsync,
      loadPostsAsync,
      loadLikesAsync,
      loadCommentsAsync,
      loadUsersAsync,
      categories,
      posts,
      likes,
      comments,
      users
    } = this.props
    !categories.length && loadCategoriesAsync()
    !posts.length && loadPostsAsync()
    !likes.length && loadLikesAsync()
    !comments.length && loadCommentsAsync()
    !users.length && loadUsersAsync()
  }
  onChangeStatus = () => {
    this.setState(prevState => ({ doShowMenuList: !prevState.doShowMenuList }))
  }
  render() {
    const { doShowMenuList } = this.state
    return (
      <Header>
        <LogoBox onClick={() => { history.push('/') }} >
          <Logo height="32" width="32" />
          <Title>小火柴的蓝色理想</Title>
        </LogoBox>
        <MenuBox onClick={this.onChangeStatus}>
          <Menu />
          <StyledMask className={doShowMenuList ? 'mask-show' : ''} />
          <StyledList className={doShowMenuList ? 'transform-show' : ''} />
        </MenuBox>
      </Header>
    )
  }
}
HomeHeader.propTypes = {
  loadCategoriesAsync: PropTypes.func.isRequired,
  loadPostsAsync: PropTypes.func.isRequired,
  loadLikesAsync: PropTypes.func.isRequired,
  loadCommentsAsync: PropTypes.func.isRequired,
  loadUsersAsync: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  likes: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired
}
const mapStateToProps = state => ({
  categories: getCategories(state),
  posts: getPosts(state),
  likes: getLikes(state),
  comments: getComments(state),
  users: getUsers(state)
})
export default connect(mapStateToProps, {
  loadCategoriesAsync,
  loadPostsAsync,
  loadLikesAsync,
  loadCommentsAsync,
  loadUsersAsync
})(HomeHeader)

const Header = styled.header`
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  box-sizing: border-box;
  height: 50px;
  padding: 10px;
  background: ${DARK_BG_COLOR};
  cursor: default;
`
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const Title = styled.h1`
  margin-left: 6px;
  font-size: 1.1em;
  line-height: 30px;
  background-image: linear-gradient(160deg, #7fdbff, #0074d9);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
`
const StyledList = styled(HomeMenuList)`
  transform: translateY(-100%);
  transition: .2s;
`
const StyledMask = styled(BaseMask)`
  z-index: 2;
  display: none;
`
const MenuBox = styled.div`
  cursor: pointer;
  & .transform-show {
    transform: translateY(0);
  }
  & .mask-show {
    display: block;
  }
`
