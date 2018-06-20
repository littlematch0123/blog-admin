import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import history from '@/utils/history'
import BaseCard from '@/common/BaseCard'
import { getCategoryCount } from '@/components/Category/module'
import { getPostCount } from '@/components/Post/PostsModule'
import { getUserCount } from '@/components/User/module'

const HomeShowList = ({ categoryCount, postCount, userCount, ...rest }) =>
  (
    <List {...rest}>
      <StyledCard onClick={() => history.push('/posts')}><Title>文章总数</Title><Count>{postCount}</Count></StyledCard>
      <StyledCard onClick={() => history.push('/categories')}><Title>类别总数</Title><Count>{categoryCount}</Count></StyledCard>
      <StyledCard onClick={() => history.push('/users')}><Title>推荐总数</Title><Count>8</Count></StyledCard>
      <StyledCard onClick={() => history.push('/users')}><Title>用户总数</Title><Count>{userCount}</Count></StyledCard>
    </List>
  )

HomeShowList.propTypes = {
  className: PropTypes.string,
  categoryCount: PropTypes.number,
  postCount: PropTypes.number,
  userCount: PropTypes.number
}
HomeShowList.defaultProps = {
  className: '',
  categoryCount: NaN,
  postCount: NaN,
  userCount: NaN
}
const mapStateToProps = state => ({
  categoryCount: getCategoryCount(state),
  postCount: getPostCount(state),
  userCount: getUserCount(state)
})
export default connect(mapStateToProps)(HomeShowList)

const List = styled.nav`
  height: 100%;
  overflow: hidden;
`
const StyledCard = styled(BaseCard)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 200px;
  height: 30px;
  padding: 10px;
  margin: 20px auto;
  cursor: pointer;
`
const Title = styled.h2`
  font-weight: normal;
  font-size: 1.1em;
  color: rgba(0, 0, 0, .8);
`
const Count = styled.span`
  color: rgba(0, 0, 0, .7);
`
