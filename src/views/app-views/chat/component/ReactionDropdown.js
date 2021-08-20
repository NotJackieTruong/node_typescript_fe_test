import React, {useState} from "react";
import "../styles/index.css"
import Utils from "../../../../utils";
import {Button, Dropdown, Menu} from "antd";
import {SmileOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from "react-redux";
import Socket from "../../../../socket/Socket";

const reactionArray = [
  '❤', '😂', '😮', '😞', '😡', '👍', '👎'
]

const ReactionDropdown = (props) => {
  const dispatch = useDispatch()
  const {userInfo, currentChat} = useSelector(state => {
    return {
      userInfo: state.auth.userInfo,
      currentChat: state.chatReducer.currentChat
    }
  })
  const onSelect = ({item, key}) => {
    let obj = {
      user: userInfo._id,
      reaction: key,
    }
    let reactionArray = [...props.message.reactions]
    let index = reactionArray.findIndex(item => item.user === userInfo._id || item.user._id === userInfo._id)
    console.log("Select: ", index)
    if (index >= 0) {
      reactionArray[index] = obj
    } else {
      reactionArray.unshift(obj)
    }
    Socket.emitReactMessage({
      messageId: props.message._id,
      chatId: currentChat._id,
      reactions: reactionArray
    })
    Socket.onReactMessage((action) => {
      dispatch(action)
    })
  }

  const menu = () => (
    <Menu onClick={onSelect} className={'d-flex flex-row pl-2 pr-2'} style={{borderRadius: 50}}>
      {reactionArray.map((item, index) => (
        <Menu.Item key={item} className={'p-2'}>
          <h2 className={'mb-0'}>{item}</h2>
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <SmileOutlined className={`align-self-center ${props.isSender ? 'mr-2' : 'ml-2'}`}/>
    </Dropdown>
  )
}

export default ReactionDropdown
