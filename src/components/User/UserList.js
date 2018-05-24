import React from 'react'
import styled from 'styled-components'
import BaseAvatar from '@/common/BaseAvatar'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import history from '@/utils/history'
import ButtonWithAutoWidth from '@/common/ButtonWithAutoWidth'
import UserDesk from './UserDesk'
import { getUsers, updateUserAsync } from './module'

class UserList extends React.Component {
  static toggle = (() => {
    let counter = 0
    return () => {
      counter = (counter + 1) % 2
      return counter
    }
  })()
  static getDerivedStateFromProps(nextProps) {
    const { users } = nextProps
    if (users.length) return { users }
    return null
  }
  constructor(props) {
    super(props)
    this.state = { users: [] }
  }
  onChangeStatusClick = t => {
    const { updateUserAsync } = this.props
    updateUserAsync({ _id: t._id, status: !t.status })
  }
  onSortByLikes = () => {
    const { users } = this.state
    if (UserList.toggle()) {
      this.setState({ users: users.sort((a, b) => a.likes.length - b.likes.length) })
    } else {
      this.setState({ users: users.sort((a, b) => b.likes.length - a.likes.length) })
    }
  }
  onSortByUserName = () => {
    const { users } = this.state
    if (UserList.toggle()) {
      this.setState({ users: users.sort((a, b) => a.username.localeCompare(b.username, 'zh-Hans-CN')) })
    } else {
      this.setState({ users: users.sort((a, b) => -a.username.localeCompare(b.username, 'zh-Hans-CN')) })
    }
  }
  onSortByComments = () => {
    const { users } = this.state
    if (UserList.toggle()) {
      this.setState({ users: users.sort((a, b) => a.comments.length - b.comments.length) })
    } else {
      this.setState({ users: users.sort((a, b) => b.comments.length - a.comments.length) })
    }
  }
  onSortByStatus = () => {
    const { users } = this.state
    if (UserList.toggle()) {
      this.setState({ users: users.sort((a, b) => a.status - b.status) })
    } else {
      this.setState({ users: users.sort((a, b) => b.status - a.status) })
    }
  }
  render() {
    const { users } = this.state
    return (
      <Wrap>
        <Route path="/users/:id" component={UserDesk} />
        <Table>
          <tbody>
            <Tr>
              <UserName onClick={this.onSortByUserName}>用户名</UserName>
              <Td onClick={this.onSortByLikes}>点赞数</Td>
              <Td onClick={this.onSortByComments}>评论数</Td>
              <Control onClick={this.onSortByStatus}>操作</Control>
            </Tr>
          </tbody>
        </Table>
        <Main>
          <Table>
            <tbody>
              {users.map(t => (
                <Tr key={t._id}>
                  <UserName onClick={() => { history.push(`/users/${t._id}`) }}>
                    <StyledAvatar>{t.username}</StyledAvatar>
                  </UserName>
                  <Td onClick={() => { history.push(`/users/${t._id}`) }}>{t.likes.length}</Td>
                  <Td onClick={() => { history.push({ pathname: `/users/${t._id}`, search: '?comment' }) }}>{t.comments.length}</Td>
                  <Control>
                    <StyledBtn onClick={() => { this.onChangeStatusClick(t) }}>
                      {t.status ? <AbledItem>启用态</AbledItem> : <DisabledItem>禁用态</DisabledItem>}
                    </StyledBtn>
                  </Control>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Main>
      </Wrap>
    )
  }
}
UserList.propTypes = {
  updateUserAsync: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  users: getUsers(state)
})
export default connect(mapStateToProps, { updateUserAsync })(UserList)


const Wrap = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
  overflow: hidden;
  font-size: 1.1em;
  line-height: 50px;
  text-align: center;
  vertical-align: middle;
`
const Table = styled.table`
  width: 100%;
`
const Main = styled.div`
  height: calc(100% - 50px);
  overflow: auto;
`
const Tr = styled.tr`
  border-bottom: 1px solid #eee;
`
const Td = styled.td`
  cursor: pointer;
`
const UserName = Td.extend`
  width: 20%;
`
const Control = Td.extend`
  width: 40%;
`
const StyledAvatar = styled(BaseAvatar)`
  display: inline-block;
`
const StyledBtn = styled(ButtonWithAutoWidth)`
  display: inline-block;
  margin: 0 4px;
`
const AbledItem = styled.span`
  color: rgba(0, 255, 0, .6);
`
const DisabledItem = styled.span`
  color: rgba(255, 0, 0, .6);
`
