import React from 'react'
import styled from 'styled-components'
import history from '@/utils/history'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'
import LinkageSelector from '@/common/LinkageSelector'
import { setCategoriesFilter, getRootCategories, getChildrenCategoriesByFilter, updateCategoryAsync } from '@/components/Category/module'
import { showAlertText } from '@/components/Alert/module'
import BaseSwipeItem from '@/common/BaseSwipeItem'
import { DARK_COLOR, DARK_BG_COLOR } from '@/constants/Colors'

class TopicsRecommendItem extends React.Component {
  constructor(props) {
    super(props)
    const { data, datas } = props
    this.state = {
      doShowSelector: false,
      currentSelectorDatas: [],
      doShowIndexChangeBox: false,
      data,
      prevData: data,
      datas
    }
  }
  onShowSelector = () => {
    const { rootCategories } = this.props
    this.setState({
      doShowSelector: true,
      currentSelectorDatas: rootCategories.map(t => ({ ...t, key: t._id, value: t.name }))
    })
  }
  onInput = data => {
    const { setCategoriesFilter } = this.props
    setCategoriesFilter(data.number).then(() => {
      const { childrenCategories } = this.props
      this.setState({ data })
      if (childrenCategories.length) {
        this.setState({
          currentSelectorDatas: childrenCategories.map(t => ({ ...t, key: t._id, value: t.name }))
        })
      } else {
        this.setState({ doShowSelector: false })
        const { updateCategoryAsync, showAlertText } = this.props
        const { prevData, datas } = this.state
        if (datas.filter(t => t.number === data.number).length) {
          showAlertText('不可重复推荐')
          this.setState({ data: prevData })
        } else {
          this.setState({
            datas: datas.map(t => {
              if (t.number === data.number) return data
              return t
            })
          })
          const { index } = prevData
          updateCategoryAsync({ recommend: false, number: prevData.number, index: 0 }).then(() => {
            updateCategoryAsync({ recommend: true, number: data.number, index }).then(() => {
              history.push('/recommends/topics')
            })
          })
        }
      }
    })
  }
  onUpdateClick = () => {
    const { data } = this.props
    history.push(`/categories/${data.number}/update`)
  }
  onIndexClick = i => {
    const { index, datas, data, updateCategoryAsync } = this.props
    if (i !== index) {
      updateCategoryAsync({ number: datas[i - 1].number, index }).then(() => {
        updateCategoryAsync({ number: data.number, index: i })
      })
    }
    this.setState({ doShowIndexChangeBox: false })
  }
  onChangeIndex = () => {
    this.setState({ doShowIndexChangeBox: true })
  }
  render() {
    const { data, doShowSelector, currentSelectorDatas, doShowIndexChangeBox } = this.state
    const { datas } = this.props
    if (data == null || datas.length === 3) return false
    const showChildren = (
      <React.Fragment>
        <Title>{data.name}</Title>
        <Des>{data.description}</Des>
      </React.Fragment>
    )
    const controlDatas = [
      { title: '编辑专题', key: 'category', onClick: this.onUpdateClick },
      { title: '更改次序', key: 'index', onClick: this.onChangeIndex }
    ]
    return (
      <React.Fragment>
        <StyledSwipeItem
          onClick={this.onShowSelector}
          showChildren={showChildren}
          controlDatas={controlDatas}
        />
        {doShowSelector && (
          <SelectorBox>
            <BaseMask />
            <StyledSelector onInput={this.onInput} datas={currentSelectorDatas} />
          </SelectorBox>
        )}
        {doShowIndexChangeBox &&
          <StyledScreen>
            <BaseMask />
            <IndexChangeBox>
              {[1, 2, 3, 4].map(t =>
                <Index key={t} onClick={() => { this.onIndexClick(t) }}>{t}</Index>)}
            </IndexChangeBox>
          </StyledScreen>
        }
      </React.Fragment>
    )
  }
}
TopicsRecommendItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    recommend: PropTypes.bool
  }).isRequired,
  datas: PropTypes.arrayOf(PropTypes.object).isRequired,
  rootCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  childrenCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
  setCategoriesFilter: PropTypes.func.isRequired,
  updateCategoryAsync: PropTypes.func.isRequired,
  showAlertText: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}
const mapStateToProps = state => ({
  rootCategories: getRootCategories(state),
  childrenCategories: getChildrenCategoriesByFilter(state)
})
export default connect(mapStateToProps, {
  setCategoriesFilter,
  updateCategoryAsync,
  showAlertText
})(TopicsRecommendItem)

const StyledSwipeItem = styled(BaseSwipeItem)`
  line-height: 72px;
  color: #fff;
  background: ${DARK_COLOR};
  box-shadow: 0 4px 16px 0 ${DARK_COLOR};
  & > div {
    flex-direction: column;
    align-items: flex-start;
    min-height: 58px;
    padding: 10px;
    line-height: 2;
    text-align: left;
  }
`
const Title = styled.dt`
  font-size: 1.1em;
`
const Des = styled.dd`
  font-size: 1em;
  text-indent: 1em;
`
const SelectorBox = styled.section`
  position: fixed;
  z-index: 1;
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
const StyledScreen = styled(BaseFullScreen)`
  z-index: 1;
`
const IndexChangeBox = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  line-height: 30px;
  text-align: center;
  background: ${DARK_BG_COLOR};
`
const Index = styled.span`
  width: 20%;
  background: rgba(0, 0, 0, .1);
`
