import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseBack from '@/common/BaseBack'
import BaseMask from '@/common/BaseMask'
import BaseInput from '@/common/BaseInput'
import { Search, Clear } from '@/common/BaseImg'
import { PRIMARY_LINE_COLOR, DARK_BG_COLOR } from '@/constants/Colors'
import { throttle } from '@/utils/util'

class BaseSearchBox extends React.Component {
  static getReg(searchText) {
    return new RegExp(searchText.replace(/[[(){}^$|?*+.\\-]/g, '\\$&'), 'ig')
  }
  constructor(props) {
    super(props)
    const { searchText } = props
    this.scrollRef = React.createRef()
    this.state = {
      filterDatas: [],
      resultDatas: [],
      limitDatas: [],
      IsNoResult: false,
      limitNumber: 16,
      page: 0,
      doLoadingMore: false,
      doNeedMoreDatas: true
    }
    if (searchText) {
      this.state = { ...this.state, searchText }
    } else {
      this.state = { ...this.state, searchText: '' }
    }
  }
  componentDidMount() {
    this.scrollRef.current.addEventListener('scroll', throttle(this.onScroll))
  }
  componentWillUnmount() {
    this.scrollRef.current.removeEventListener('scroll', throttle(this.onScroll))
  }
  onScroll = e => {
    const { scrollTop, offsetHeight, scrollHeight } = e.target
    if (scrollTop + offsetHeight === scrollHeight) {
      const { doNeedMoreDatas } = this.state
      doNeedMoreDatas && this.loadMore()
    }
  }
  onClear = () => {
    this.onInitial()
    this.setState({ searchText: '' })
  }
  onInitial() {
    this.setState({
      resultDatas: [],
      limitDatas: [],
      IsNoResult: false,
      page: 0,
      doLoadingMore: false,
      doNeedMoreDatas: true
    })
  }
  onSearchClick = () => {
    this.onSearch()
  }
  onEnter = e => {
    if (e.keyCode === 13) {
      this.onSearch()
    }
  }
  onSearch = () => {
    this.onInitial()
    this.props.datas && this.state.searchText && this.onTestResultIsEmpty()
  }
  onAddDatas() {
    const { filterDatas, limitNumber, page } = this.state
    const limitDatas = filterDatas.slice(page * limitNumber, (page + 1) * limitNumber)
    limitDatas.length < limitNumber && this.setState({ loadingText: '数据已经全部加载' })
    const resultDatas = [...this.state.resultDatas, ...limitDatas]
    resultDatas.length === filterDatas.length && this.setState({ doNeedMoreDatas: false })
    this.setState({ limitDatas, resultDatas })
  }
  onTestResultIsEmpty() {
    const { datas } = this.props
    const { searchText } = this.state
    const reg = BaseSearchBox.getReg(searchText)
    const filterDatas = datas.filter(t => t.title.trim().match(reg))
    if (filterDatas.length === 0) {
      this.setState({ IsNoResult: true })
    } else {
      this.setState({ filterDatas }, () => { this.onAddDatas() })
    }
  }
  loadMore() {
    const { page } = this.state
    this.setState({ doLoadingMore: true, page: page + 1 }, () => {
      setTimeout(() => {
        this.onAddDatas()
        this.setState({ doLoadingMore: false })
      }, 1000)
    })
  }
  render() {
    const {
      searchText,
      resultDatas,
      limitNumber,
      IsNoResult,
      doLoadingMore,
      doNeedMoreDatas
    } = this.state
    const { onInput, onBack } = this.props
    return (
      <StyledScreen>
        <BaseMask />
        <StyledBack onClick={() => { onBack && onBack() }} />
        <Inner>
          <SearchBox>
            <InputBox>
              <StyledInput
                placeholder="搜索html试试看"
                value={searchText}
                onChange={e => { this.setState({ searchText: e.target.value }) }}
                onKeyUp={e => this.onEnter(e)}
              />
              {!!searchText && <StyledClear onClick={this.onClear} />}
            </InputBox>
            <ButtonBox onClick={this.onSearchClick}><Search />搜索</ButtonBox>
          </SearchBox>
          <List innerRef={this.scrollRef}>
            {resultDatas.map(t =>
              <Item key={t._id} onClick={() => { onInput && onInput(t) }}>{t.title}</Item>)}
            {resultDatas.length >= limitNumber && !doNeedMoreDatas &&
              <ExtendedItem>已经到底了...</ExtendedItem>}
          </List>
          {IsNoResult && <NoResultItem>抱歉，暂无搜索结果</NoResultItem>}
          {doLoadingMore && <LoadingMoreItem>正在加载新数据...</LoadingMoreItem>}
        </Inner>
      </StyledScreen>
    )
  }
}
BaseSearchBox.propTypes = {
  datas: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInput: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  searchText: PropTypes.string
}
BaseSearchBox.defaultProps = {
  searchText: ''
}
export default BaseSearchBox

const StyledScreen = styled(BaseFullScreen)`
  z-index: 1;
  background: #fff;
`
const StyledBack = styled(BaseBack)`
  position: relative;
  margin: 10px;
`
const Inner = styled.section`
  position: relative;
  height: calc(100% - 100px);
  padding: 10px;
  background: rgba(255, 255, 255, .1);
`
const SearchBox = styled.header`
  display: flex;
  height: 30px;
  margin: 10px 0;
  font-size: 1.1em;
  line-height: 30px;
`
const InputBox = styled.span`
  position: relative;
  flex: 1;
`
const StyledInput = styled(BaseInput)`
  padding: 6px 30px 6px 10px;
  border-bottom: 2px solid ${PRIMARY_LINE_COLOR};
  color: rgba(0, 0, 0, .8);
  background: none;
`
const StyledClear = styled(Clear)`
  position: absolute;
  top: 50%;
  right: 0;
  border-radius: 4px;
  fill: rgba(0, 0, 0, .6);
  transform: translateY(-50%);
`
const ButtonBox = styled.span`
  display: flex;
  align-items: center;
  padding: 0 6px;
  margin-left: 6px;
  border-radius: 4px;
  background: ${DARK_BG_COLOR};
`
const List = styled.ul`
  height: calc(100% - 50px);
  overflow: auto;
  line-height: 60px;
`
const Item = styled.li`
  position: relative;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${PRIMARY_LINE_COLOR};
    transform: scaleY(.5);
    content: '';
  }
`
const ExtendedItem = Item.extend`
  color: rgba(0, 0, 0, .6);
  &::after {
    position: static;
    content: '';
  }
`
const NoResultItem = styled.div`
  position: absolute;
  top: 70px;
  left: 20px;
`

const LoadingMoreItem = styled.div`
  margin-top: 10px;
  line-height: 30px;
`
