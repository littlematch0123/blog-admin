import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { PRIMARY_COLOR, DARK_BG_COLOR } from '@/constants/Colors'

const HomeNav = ({ className, ...rest }) =>
  (
    <List className={className} {...rest} >
      <StyledLink activeClassName="styled-nav-active" to="/posts">文章</StyledLink>
      <StyledLink activeClassName="styled-nav-active" to="/categories">类别</StyledLink>
      <StyledLink activeClassName="styled-nav-active" to="/commentsInfo">评论</StyledLink>
      <StyledLink activeClassName="styled-nav-active" to="/recommends">推荐</StyledLink>
      <StyledLink activeClassName="styled-nav-active" to="/users">用户</StyledLink>
    </List>
  )

HomeNav.propTypes = {
  className: PropTypes.string
}
HomeNav.defaultProps = {
  className: ''
}

export default HomeNav


const List = styled.nav`
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  height: 50px;
  font-size: 1.1em;
  line-height: 48px;
  text-align: center;
  color: rgba(0, 0, 0, .7);
  background: ${DARK_BG_COLOR};
  & .styled-nav-active {
    border-top: 2px solid ${PRIMARY_COLOR};
    color: ${PRIMARY_COLOR};
  }
`
const StyledLink = styled(NavLink)`
  flex: 1;
  border-top: 2px solid transparent;
`
