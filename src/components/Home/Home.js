import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { getWrapHeight } from '@/components/Size/module'
import Category from '@/components/Category/Category'
import Post from '@/components/Post/Post'
import Recommend from '@/components/Recommend/Recommend'
import UserList from '@/components/User/UserList'
import { PRIMARY_BG_COLOR } from '@/constants/Colors'
import HomeHeader from './HomeHeader'
import HomeShowList from './HomeShowList'
import HomeNav from './HomeNav'

const Home = ({ wrapHeight }) => (
  <section style={{ height: `${wrapHeight}px` }}>
    <HomeHeader />
    <Inner>
      <Route exact path="/" component={HomeShowList} />
      <Route path="/categories" component={Category} />
      <Route path="/posts" component={Post} />
      <Route path="/recommends" component={Recommend} />
      <Route path="/users" component={UserList} />
    </Inner>
    <HomeNav />
  </section>
)
Home.propTypes = {
  wrapHeight: PropTypes.number
}
Home.defaultProps = {
  wrapHeight: null
}
const mapStateToProps = state => ({ wrapHeight: getWrapHeight(state) })

export default connect(mapStateToProps)(Home)

const Inner = styled.div`
  height: calc(100% - 100px);
  background: ${PRIMARY_BG_COLOR};
`
