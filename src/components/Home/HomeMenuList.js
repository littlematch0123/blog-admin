import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import { Home, Refresh, Search, Exit, Info, Reception } from '@/common/BaseImg'
import BaseBadge from '@/common/BaseBadge'
import { logout } from '@/components/Auth/module'
import { getHaveNotViewedCommentCount } from '@/components/Comment/module'

const HomeMenuList = ({ className, logout, commentCount, ...rest }) => (
  <List className={className} {...rest}>
    <Item onClick={() => { history.push('/') }}><Home />主页</Item>
    <Item onClick={() => { history.go(0) }}><Refresh />刷新</Item>
    <Item onClick={() => { history.push('/posts/search') }}><Search />文章搜索</Item>
    {commentCount > 0 &&
      <Item onClick={() => { history.push('/commentsinfo') }}>
        <Info /><div>未读评论<BaseBadge>{commentCount}</BaseBadge></div>
      </Item>}
    <Item onClick={() => { window.location.href = 'https://xiaohuochai.cc' }}><Reception />去往前台</Item>
    <Item onClick={logout}><Exit />退出</Item>
  </List>
)

HomeMenuList.propTypes = {
  className: PropTypes.string,
  logout: PropTypes.func.isRequired,
  commentCount: PropTypes.number
}
HomeMenuList.defaultProps = {
  className: '',
  commentCount: NaN
}
const mapStateToProps = state => ({
  commentCount: getHaveNotViewedCommentCount(state)
})

export default connect(mapStateToProps, { logout })(HomeMenuList)

const List = styled.ul`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: #fff;
`
const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  line-height: 2;
  & > svg {
    margin-right: 16px;
    fill: rgba(0, 0, 0, .6);
  }
`
