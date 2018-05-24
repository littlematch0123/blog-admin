import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import history from '@/utils/history'
import PropTypes from 'prop-types'
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'
import BaseSearchBox from '@/common/BaseSearchBox'
import { getPostsWithTitleData, updatePostAsync } from '@/components/Post/PostsModule'
import { showAlertText } from '@/components/Alert/module'
import BaseSwipeItem from '@/common/BaseSwipeItem'
import { DARK_BG_COLOR, TRANSPARENT_BG_COLOR } from '@/constants/Colors'

class PostRecommendItem extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const { data, datas } = nextProps
    return {
      doShowIndexChangeBox: false,
      doShowSearchBox: false,
      data,
      prevData: data,
      datas
    }
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  onInput = data => {
    this.setState({ doShowSearchBox: false })
    const { updatePostAsync, showAlertText } = this.props
    const { prevData, datas } = this.state
    if (datas.filter(t => t._id === data._id).length) {
      showAlertText('不可重复推荐')
      this.setState({ data: prevData })
    } else {
      this.setState({
        datas: datas.map(t => {
          if (t.number === data.number) return data
          return t
        })
      })
      updatePostAsync({ recommend: false, _id: prevData._id, index: 0 }).then(() => {
        updatePostAsync({ recommend: true, _id: data._id, index: prevData.index }).then(() => {
          history.push('/recommends/posts')
        })
      })
    }
  }
  onChangeImg = () => {
    const { data } = this.props
    history.push(`/posts/${data._id}/uploadimg`)
  }
  onChangeIndex = () => {
    this.setState({ doShowIndexChangeBox: true })
  }
  onIndexClick = i => {
    const { index, datas, data, updatePostAsync } = this.props
    if (index !== i) {
      updatePostAsync({ _id: datas[i - 1]._id, index }).then(() => {
        updatePostAsync({ _id: data._id, index: i })
      })
    }
    this.setState({ doShowIndexChangeBox: false })
  }
  render() {
    const { posts, datas } = this.props
    const { doShowSearchBox, data, doShowIndexChangeBox } = this.state
    const { title, titleData, imgUrl } = data
    if (data == null || datas.length === 3) return false
    const bgUrl = imgUrl ? `url(${imgUrl}` : ''
    const showChildren = (
      <React.Fragment>
        <Title>{title}</Title>
        <Type>{titleData}</Type>
      </React.Fragment>
    )
    const controlDatas = [
      { title: '更新配图', key: 'post', onClick: this.onChangeImg },
      { title: '更改排序', key: 'index', onClick: this.onChangeIndex }
    ]
    return (
      <React.Fragment>
        <StyledSwipeItem
          controlDatas={controlDatas}
          showChildren={showChildren}
          onClick={() => { this.setState({ doShowSearchBox: true }) }}
          style={{ backgroundImage: bgUrl }}
        />
        {doShowSearchBox &&
          <BaseSearchBox
            searchText={title}
            datas={posts}
            onInput={this.onInput}
            onBack={() => { this.setState({ doShowSearchBox: false }) }}
          />
        }
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

PostRecommendItem.propTypes = {
  data: PropTypes.shape({
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    imgData: PropTypes.string,
    recommend: PropTypes.bool
  }).isRequired,
  datas: PropTypes.arrayOf(PropTypes.object).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatePostAsync: PropTypes.func.isRequired,
  showAlertText: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}
const mapStateToProps = state => ({
  posts: getPostsWithTitleData(state)
})
export default connect(mapStateToProps, { updatePostAsync, showAlertText })(PostRecommendItem)

const StyledSwipeItem = styled(BaseSwipeItem)`
  line-height: 100px;
  color: #fff;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
`
const Title = styled.dt`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 0 30px;
  overflow: hidden;
  font-size: 1.5em;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: rgba(0, 0, 0, .3);
  cursor: pointer;
`
const Type = styled.dd`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: inline-block;
  padding: 2px 4px;
  border-radius: 6px;
  font-size: 1em;
  line-height: 1.5;
  background: ${TRANSPARENT_BG_COLOR};
`
const IndexChangeBox = styled.div`
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

const StyledScreen = styled(BaseFullScreen)`
  z-index: 1;
`
