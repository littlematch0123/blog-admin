import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '@/utils/history'
import BaseButton from '@/common/BaseButton'
import BreadCrumb from '@/common/BreadCrumb'
import { Clear, Add } from '@/common/BaseImg'
import BaseMask from '@/common/BaseMask'
import LinkageSelector from '@/common/LinkageSelector'
import { DARK_LINE_COLOR, PRIMARY_LINE_COLOR } from '@/constants/Colors'
import { setCategoriesFilter, getRootCategories, getChildrenCategoriesByFilter } from '@/components/Category/module'
import { setPostsFilter, getPostsByFilter } from './PostsModule'

class PostList extends React.Component {
  constructor(props) {
    super(props)
    const { setPostsFilter, setCategoriesFilter } = this.props
    setPostsFilter(null)
    setCategoriesFilter(null)
    this.state = {
      doShowSelector: false,
      currentSelectorDatas: [],
      titleDatas: []
    }
  }
  onUpdate = item => {
    const { setCategoriesFilter, setPostsFilter } = this.props
    const { titleDatas } = this.state
    setPostsFilter(item.number)
    setCategoriesFilter(item.number).then(() => {
      const { childrenCategories } = this.props
      this.setState({ titleDatas: [...titleDatas, item] })
      if (childrenCategories.length) {
        this.setState({
          currentSelectorDatas: childrenCategories.map(t => ({ ...t, key: t._id, value: t.name }))
        })
      } else {
        this.setState({ doShowSelector: false })
      }
    })
  }
  onInitSelector = () => {
    const { rootCategories } = this.props
    this.setState({
      doShowSelector: true,
      currentSelectorDatas: rootCategories.map(t => ({ ...t, key: t._id, value: t.name })),
      titleDatas: []
    })
  }
  onInitFilter = () => {
    const { setCategoriesFilter, setPostsFilter } = this.props
    setPostsFilter(null)
    setCategoriesFilter(null)
    this.setState({ titleDatas: [] })
  }
  render() {
    const { posts } = this.props
    const { doShowSelector, currentSelectorDatas, titleDatas } = this.state
    return (
      <Wrap>
        <TypeBox>
          <StyledButton onClick={this.onInitSelector}>类别筛选</StyledButton>
          <StyledBreadCrumb datas={titleDatas} />
          {!!titleDatas.length && <StyledClear onClick={this.onInitFilter} />}
        </TypeBox>
        <List>
          {posts.map(t => <Item key={t._id} onClick={() => { history.push(`/posts/${t._id}`) }}>{t.title}</Item>)}
        </List>
        <StyledAdd width="46" height="46" onClick={() => { history.push('/posts/add') }} />
        {doShowSelector && (
          <SelectorBox>
            <BaseMask onClick={() => { this.setState({ doShowSelector: false }) }} />
            <StyledSelector onInput={this.onUpdate} datas={currentSelectorDatas} />
          </SelectorBox>
        )}
      </Wrap>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  rootCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  childrenCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCategoriesFilter: PropTypes.func.isRequired,
  setPostsFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  posts: getPostsByFilter(state),
  rootCategories: getRootCategories(state),
  childrenCategories: getChildrenCategoriesByFilter(state)
})
export default connect(mapStateToProps, { setPostsFilter, setCategoriesFilter })(PostList)

const Wrap = styled.section`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  line-height: 40px;
`
const TypeBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${DARK_LINE_COLOR};
  line-height: 32px;
`
const StyledButton = styled(BaseButton)`
  flex-shrink: 0;
  width: auto;
  padding: 0 8px;
  border: 1px solid ${DARK_LINE_COLOR};
  color: rgba(0, 0, 0, .6);
  background: #f5f5f5;
  box-shadow: none;
  cursor: pointer;
`
const StyledBreadCrumb = styled(BreadCrumb)`
  flex: 1;
  margin: 0 6px;
`
const StyledClear = styled(Clear)`
  fill: rgba(0, 0, 0, .6);
`
const List = styled.ul`
  height: calc(100% - 40px);
  overflow: auto;
  line-height: 50px;
`
const Item = styled.li`
  position: relative;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &::after {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: ${PRIMARY_LINE_COLOR};
    transform: scaleY(.5);
    content: '';
  }
`
const SelectorBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
const StyledSelector = styled(LinkageSelector)`
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
`
const StyledAdd = styled(Add)`
  position: absolute;
  bottom: 10px;
  right: 26px;
  fill: rgba(0, 0, 0, .4);
  cursor: pointer;
`
