import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import { DARK_BG_COLOR } from '@/constants/Colors'
import BaseFullScreen from '@/common/BaseFullScreen'
import ButtonBox from '@/common/ButtonBox'
import BaseInput from '@/common/BaseInput'
import BaseTextArea from '@/common/BaseTextArea'
import BreadCrumb from '@/common/BreadCrumb'
import BaseMask from '@/common/BaseMask'
import LinkageSelector from '@/common/LinkageSelector'
import { setCategoriesFilter, getRootCategories, getChildrenCategoriesByFilter } from '@/components/Category/module'
import { addPostAsync, updatePostAsync } from './PostsModule'
import { getPostWithTitleDatas } from './PostModule'

class PostForm extends React.Component {
  constructor(props) {
    super(props)
    const { operate, post } = props
    if (operate === 'update' && post) {
      const { _id, title, text, titleDatas, category } = post
      this.state = {
        _id,
        title,
        content: text,
        titleDatas,
        category: category._id,
        doShowSelector: false,
        currentSelectorDatas: []
      }
    } else {
      this.state = {
        _id: '',
        title: '',
        content: '',
        titleDatas: [],
        category: '',
        doShowSelector: false,
        currentSelectorDatas: []
      }
    }
  }
  componentDidMount() {
    const { post, match, operate } = this.props
    if (operate === 'update' && post === null) {
      history.push(`/posts/${match.params.id}`)
    }
  }
  onConfirmClick = () => {
    const { _id, category, title, content, description } = this.state
    const text = window.btoa(unescape(encodeURIComponent(content)))
    const { updatePostAsync, operate, addPostAsync } = this.props
    if (operate === 'update') {
      updatePostAsync({ _id, category, title, description, content: text }).then(() => {
        history.push(`/posts/${_id}`)
      })
    } else {
      addPostAsync({ category, title, description, content: text })
    }
  }
  onSelectCategory = () => {
    const { rootCategories } = this.props
    this.setState({
      doShowSelector: true,
      currentSelectorDatas: rootCategories.map(t => ({ ...t, key: t._id, value: t.name })),
      titleDatas: []
    })
  }
  onUpdate = item => {
    const { setCategoriesFilter } = this.props
    const { titleDatas } = this.state
    setCategoriesFilter(item.number).then(() => {
      const { childrenCategories } = this.props
      this.setState({ titleDatas: [...titleDatas, item] })
      if (childrenCategories.length) {
        this.setState({
          currentSelectorDatas: childrenCategories.map(t => ({ ...t, key: t._id, value: t.name }))
        })
      } else {
        this.setState({ doShowSelector: false, category: item._id })
      }
    })
  }
  render() {
    const {
      title,
      content,
      titleDatas,
      doShowSelector,
      currentSelectorDatas
    } = this.state
    return (
      <StyledScreen>
        <Inner>
          <InputBox>
            <Label htmlFor="title">标题</Label>
            <StyledInput id="title" value={title} onChange={e => this.setState({ title: e.target.value })} />
          </InputBox>
          <InputBox onClick={this.onSelectCategory}>
            <Label>类别</Label>
            {!!titleDatas && <StyledCrumb datas={titleDatas} />}
          </InputBox>
          <StyledTextArea
            value={content}
            onChange={e => this.setState({ content: e.target.value })}
            placeholder="内容"
          />
          <ButtonBox onConfirmClick={this.onConfirmClick} />
        </Inner>
        {doShowSelector && (
          <SelectorBox>
            <BaseMask />
            <StyledSelector onInput={this.onUpdate} datas={currentSelectorDatas} />
          </SelectorBox>
        )}
      </StyledScreen>
    )
  }
}
PostForm.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.object
  }),
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  operate: PropTypes.string.isRequired,
  rootCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  childrenCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCategoriesFilter: PropTypes.func.isRequired,
  updatePostAsync: PropTypes.func.isRequired,
  addPostAsync: PropTypes.func.isRequired
}
PostForm.defaultProps = {
  post: null
}
const mapStateToProps = state => ({
  post: getPostWithTitleDatas(state),
  rootCategories: getRootCategories(state),
  childrenCategories: getChildrenCategoriesByFilter(state)
})
export default connect(mapStateToProps, {
  setCategoriesFilter,
  addPostAsync,
  updatePostAsync
})(PostForm)

const StyledScreen = styled(BaseFullScreen)`
  z-index: 1;
  background: #fff;
`
const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 960px;
  height: 100%;
  padding: 20px 10px;
  margin: 0 auto;
  border-radius: 4px;
  background: rgba(255, 255, 255, .1);
`
const InputBox = styled.div`
  position: relative;
  flex-shrink: 0;
  height: 30px;
  margin: 10px 0;
  font-size: 1.1em;
  line-height: 30px;
`
const Label = styled.label`
  position: absolute;
  top: 50%;
  left: -2px;
  padding: 0 8px;
  border-radius: 4px;
  color: rgba(0, 0, 0, .6);
  background: ${DARK_BG_COLOR};
  transform: translateY(-50%);
`

const StyledInput = styled(BaseInput)`
  padding: 6px 10px;
  border-bottom: 2px solid ${DARK_BG_COLOR};
  text-indent: 3em;
  color: rgba(0, 0, 0, .8);
`

const StyledTextArea = styled(BaseTextArea)`
  flex: 1;
  height: auto;
  margin: 10px 0;
  color: rgba(0, 0, 0, .8);
`

const StyledCrumb = styled(BreadCrumb)`
  margin-left: 4em;
  color: rgba(0, 0, 0, .8);
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
