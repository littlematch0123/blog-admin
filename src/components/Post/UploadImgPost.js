import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import history from '@/utils/history'
import PropTypes from 'prop-types'
import BaseFullScreen from '@/common/BaseFullScreen'
import BaseMask from '@/common/BaseMask'
import ButtonBox from '@/common/ButtonBox'
import { loadTokenAsync, getToken } from '@/components/Qiniu/module'
import * as qiniu from 'qiniu-js'
import { STATIC } from '@/constants/API'
import { showAlertText, showLoading, hideLoading } from '@/components/Alert/module'
import { getPostsById, updatePostAsync } from './PostsModule'

class UploadImgPost extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { posts, match } = nextProps
    const { id } = match.params
    if (Object.keys(posts).length && posts[id].imgUrl) {
      // 如果文件已经更改，触发alert时，不再改变state
      const { file } = prevState
      if (file) return null
      return { imgUrl: posts[id].imgUrl, text: '', file: null }
    }
    return null
  }
  static onCreateImgName(file, id) {
    const fileName = file.name
    const index = fileName.lastIndexOf('.')
    const extension = fileName.slice(index + 1)
    const dateStr = new Date().toJSON().replace(/\D/g, '').slice(0, 14)
    const name = `${id}_${dateStr}.${extension}`
    return name
  }
  constructor(props) {
    super(props)
    this.fileRef = React.createRef()
    this.state = {
      imgUrl: '',
      text: '点此上传图片，若选择照片，请选横拍照片',
      file: null
    }
  }
  componentDidMount() {
    const { loadTokenAsync, token } = this.props
    !token.length && loadTokenAsync()
  }
  onSubmit = () => {
    const { file } = this.state
    const { token, showAlertText, updatePostAsync, match } = this.props
    const { id } = match.params
    if (!file) return
    const key = UploadImgPost.onCreateImgName(file, id)
    if (!token) showAlertText('图片服务器异常，请刷新后再试')
    const observer = {
      next(res) {
        showAlertText(`${parseInt(res.total.percent, 10)}%`)
      },
      error() {
        showAlertText('图片服务器异常，请刷新后再试')
      },
      complete() {
        updatePostAsync({ _id: id, imgUrl: `${STATIC}/${key}` }).then(() => {
          history.goBack()
        })
      }
    }
    qiniu.upload(file, key, token, null, { useCdnDomain: true }).subscribe(observer)
  }
  onItemClick = () => {
    this.fileRef.current.click()
  }
  fileChange = e => {
    const file = e.target.files[0]
    const { showAlertText, showLoading, hideLoading } = this.props
    // 如果一个文件被选中
    if (file) {
      // 一张图片被选中
      if (/image/.test(file.type)) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        showLoading()
        reader.onload = () => {
          hideLoading()
          this.setState({ imgUrl: reader.result, file, text: '' })
        }
      // 其他格式文件被选中
      } else {
        showAlertText('请选择一张图片')
      }
    }
  }
  render() {
    const { imgUrl, text } = this.state
    return (
      <BaseFullScreen>
        <BaseMask />
        <Inner>
          <StyledInput type="file" innerRef={this.fileRef} onChange={e => this.fileChange(e)} />
          <Item onClick={this.onItemClick} style={{ backgroundImage: `url(${imgUrl})` }}>{text}</Item>
          <ButtonBox onConfirmClick={this.onSubmit} />
        </Inner>
      </BaseFullScreen>
    )
  }
}
UploadImgPost.propTypes = {
  loadTokenAsync: PropTypes.func.isRequired,
  showAlertText: PropTypes.func.isRequired,
  showLoading: PropTypes.func.isRequired,
  hideLoading: PropTypes.func.isRequired,
  updatePostAsync: PropTypes.func.isRequired,
  match: PropTypes.shape({
    exact: PropTypes.bool,
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  token: PropTypes.string
}
UploadImgPost.defaultProps = {
  token: ''
}
const mapStateToProps = state => ({
  posts: getPostsById(state),
  token: getToken(state)
})
export default connect(mapStateToProps, {
  loadTokenAsync,
  showAlertText,
  showLoading,
  hideLoading,
  updatePostAsync
})(UploadImgPost)

const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: 960px;
  padding: 20px;
  margin: 50px auto;
  border-radius: 4px;
  font-size: 1.2em;
  background: rgba(255, 255, 255, .1);
`
const StyledInput = styled.input`
  display: none;
`
const Item = styled.div`
  height: 200px;
  margin: 10px auto;
  border-radius: 4px;
  line-height: 200px;
  text-align: center;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #f8f8f8;
`
