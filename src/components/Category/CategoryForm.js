import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '@/utils/history'
import BaseFullScreen from '@/common/BaseFullScreen'
import ButtonBox from '@/common/ButtonBox'
import BaseInput from '@/common/BaseInput'
import BaseMask from '@/common/BaseMask'
import BaseTextArea from '@/common/BaseTextArea'
import { getParentNumber } from '@/utils/util'
import { showAlertText, hideAlertText } from '@/components/Alert/module'
import {
  setCategoriesFilter,
  getCategoryByFilter,
  addCategoryAsync,
  updateCategoryAsync,
  getNewChildCategoryNumberByNumber
} from './module'

class CategoryForm extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { setCategoriesFilter, match, operate, category } = nextProps
    const { id } = match.params
    setCategoriesFilter(Number(id))
    if (operate === 'update' && category) {
      const { name, description } = category
      return { name, description: description || '' }
    }
    return null
  }
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }
  }
  onConfirmClick = () => {
    const {
      operate,
      match,
      addCategoryAsync,
      updateCategoryAsync,
      newChildCategoryNumber,
      showAlertText,
      hideAlertText
    } = this.props
    const { id } = match.params
    const { name, description } = this.state
    if (operate === 'add') {
      // 如果要新增的子级类别数字返回假值，则进行报错
      if (Number.isNaN(newChildCategoryNumber)) {
        showAlertText('类别超过最深层级，无法新增！')
        setTimeout(() => {
          hideAlertText()
        }, 2000)
      } else {
        addCategoryAsync({ name, description, number: newChildCategoryNumber }).then(() => {
          history.push(`/categories/${getParentNumber(newChildCategoryNumber)}`)
        })
      }
    } else {
      updateCategoryAsync({ name, description, number: Number(id) }).then(() => {
        history.goBack()
      })
    }
  }
  render() {
    const { name, description } = this.state
    return (
      <BaseFullScreen>
        <BaseMask />
        <Inner>
          <StyledInput
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="标题"
          />
          <StyledTextArea
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            placeholder="描述"
          />
          <ButtonBox onConfirmClick={this.onConfirmClick} cancelColor="#fff" />
        </Inner>
      </BaseFullScreen>
    )
  }
}
CategoryForm.propTypes = {
  operate: PropTypes.string.isRequired,
  addCategoryAsync: PropTypes.func.isRequired,
  updateCategoryAsync: PropTypes.func.isRequired,
  showAlertText: PropTypes.func.isRequired,
  hideAlertText: PropTypes.func.isRequired,
  newChildCategoryNumber: PropTypes.number,
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}
CategoryForm.defaultProps = {
  newChildCategoryNumber: NaN
}
const mapStateToProps = state => ({
  newChildCategoryNumber: getNewChildCategoryNumberByNumber(state),
  category: getCategoryByFilter(state)
})
export default connect(mapStateToProps, {
  setCategoriesFilter,
  addCategoryAsync,
  updateCategoryAsync,
  showAlertText,
  hideAlertText
})(CategoryForm)

const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: 960px;
  padding: 20px 10px;
  margin: 50px auto;
  border-radius: 4px;
  background: rgba(255, 255, 255, .1);
  & ::placeholder {
    font-size: 1.1em;
    color: #fff;
  }
`
const StyledInput = styled(BaseInput)`
  margin: 10px 0;
  color: rgba(0, 0, 0, .8);
  background: none;
`
const StyledTextArea = styled(BaseTextArea)`
  height: 200px;
  margin: 10px 0;
  color: rgba(0, 0, 0, .8);
  background: none;
`
