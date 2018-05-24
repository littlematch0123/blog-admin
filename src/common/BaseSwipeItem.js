import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { DARK_BG_COLOR } from '@/constants/Colors'

class BaseSwipeItem extends React.Component {
  static checkSwipe(absMove, duration) {
    const THRESHOLD = 10
    const SHORTESTTIME = 300
    // 距离大于10，且时间小于300ms，才算做一次滑动
    return Boolean(absMove > THRESHOLD && duration < SHORTESTTIME)
  }
  constructor(props) {
    super(props)
    this.itemRef = React.createRef()
    this.clientHeight = null
    this.isMoving = false
    this.state = { doShowControlBox: false }
  }
  componentDidMount() {
    this.clientHeight = this.itemRef.current.clientHeight
  }
  onTouchStart = e => {
    this.startTime = new Date().getTime()
    this.startX = e.targetTouches[0].pageX
    this.startY = e.targetTouches[0].pageY
  }
  onTouchEnd = e => {
    const { pageX, pageY } = e.changedTouches[0]
    // 如果y轴移动距离大于元素高度，说明手指已经移出元素本身，则取消滑动
    if (pageY - this.startY > this.clientHeight) {
      return false
    }
    const moveX = pageX - this.startX
    const duration = new Date().getTime() - this.startTime
    // 如果符合滑动要求，且向左滑动，则控制条滑出
    if (BaseSwipeItem.checkSwipe(Math.abs(moveX), duration) && moveX < 0) {
      this.setState({ doShowControlBox: true })
    } else {
      this.setState({ doShowControlBox: false })
    }
    return true
  }
  render() {
    const { doShowControlBox } = this.state
    const { controlDatas, showChildren, onClick, ...rest } = this.props
    return (
      <Wrap
        innerRef={this.itemRef}
        onTouchStart={e => this.onTouchStart(e)}
        onTouchEnd={e => this.onTouchEnd(e)}
        {...rest}
      >
        <ShowBox onClick={onClick}>{showChildren}</ShowBox>
        <ControlBox className={doShowControlBox ? 'styled-control-swipe' : ''}>
          {controlDatas.map(t =>
            (!t.hidenCondition && <Control onClick={t.onClick} key={t.key}>{t.title}</Control>))}
        </ControlBox>
      </Wrap>
    )
  }
}
BaseSwipeItem.propTypes = {
  controlDatas: PropTypes.arrayOf(PropTypes.object).isRequired,
  showChildren: PropTypes.node,
  onClick: PropTypes.func.isRequired
}
BaseSwipeItem.defaultProps = {
  showChildren: ''
}
export default BaseSwipeItem

const Wrap = styled.div`
  position: relative;
  width: 80%;
  max-width: 300px;
  margin: 16px auto;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
  @media all and (min-width: 900px) {
    overflow: visible;
  }
`
const ShowBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ControlBox = styled.nav`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  transform: translateX(100%);
  transition: .2s;
  &.styled-control-swipe {
    transform: translateX(0);
  }
`
const Control = styled.span`
  width: auto;
  height: 40px;
  padding: 0 8px;
  margin: 0 8px;
  font-size: 1.1em;
  line-height: 40px;
  word-spacing: .2em;
  color: rgba(0, 0, 0, .6);
  background: ${DARK_BG_COLOR};
  cursor: pointer;
`
