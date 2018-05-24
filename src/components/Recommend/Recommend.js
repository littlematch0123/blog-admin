import React from 'react'
import styled from 'styled-components'
import history from '@/utils/history'
import { Route, Switch } from 'react-router-dom'
import TopicsRecommendList from './TopicsRecommendList'
import PostsRecommendList from './PostsRecommendList'

const Recommend = () =>
  (
    <Switch>
      <Route
        exact
        path="/recommends"
        render={() =>
          (
            <Wrap>
              <Item onClick={() => { history.push('/recommends/topics') }}>专题推荐</Item>
              <Item onClick={() => { history.push('/recommends/posts') }}>文章推荐</Item>
            </Wrap>
          )
        }
      />
      <Route path="/recommends/topics" component={TopicsRecommendList} />
      <Route path="/recommends/posts" component={PostsRecommendList} />
    </Switch>
  )
export default Recommend

const Wrap = styled.ul`
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`

const Item = styled.li`
  position: relative;
  width: 80%;
  max-width: 300px;
  margin: 30px auto;
  border-radius: 4px;
  overflow: hidden;
  font-size: 1.1em;
  line-height: 60px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
  cursor: pointer;
`
