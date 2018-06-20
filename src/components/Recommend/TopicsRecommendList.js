import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import BaseBack from '@/common/BaseBack'
import { getRecommendedCategories } from '@/components/Category/module'
import TopicRecommendItem from './TopicRecommendItem'

const TopicsRecommendList = ({ categories }) =>
  (
    <Wrap>
      <BaseBack onClick={() => { history.push('/recommends') }}>返回</BaseBack>
      <ul>
        {categories.map((t, i) =>
          <li key={t._id}><TopicRecommendItem data={t} datas={categories} index={i + 1} /></li>)}
      </ul>
    </Wrap>
  )
TopicsRecommendList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired
}
const mapStateToProps = state => ({
  categories: getRecommendedCategories(state)
})
export default connect(mapStateToProps)(TopicsRecommendList)

const Wrap = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 20px 10px;
  overflow-x: hidden;
  overflow-y: auto;
`
