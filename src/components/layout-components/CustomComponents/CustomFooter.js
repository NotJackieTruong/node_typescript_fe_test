import React, {useState} from "react";
import {Button, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import Socket from "../../../socket/Socket";

const CustomFooter = () => {
  const [message, setMessage] = useState("")
  const {currentChat, userInfo} = useSelector(state => {
    return {
      currentChat: state.chatReducer.currentChat,
      userInfo: state.auth.userInfo
    }
  })

  const onChange = (event) => {
    // setMessage()
    setMessage(event.target.value)
  }

  const onPressEnter = () => {
    let messageObj = {
      chat: currentChat._id,
      message: message,
      sender: userInfo._id,
      createdAt: new Date(Date.now()),
    }
    console.log({messageObj})
    Socket.emitSendMessage(messageObj)
    setMessage("")
  }

  return (
    <div className={'mr-3 ml-3 mb-3'}>
      <Input
        size={"small"}
        placeholder={"Type a message..."}
        suffix={<Button disabled={message === ""} ghost={true} shape={'circle'}
                        icon={<SendOutlined style={{color: '#007aff'}}/>} onClick={onPressEnter}/>}
        style={{
          borderRadius: 50,
        }}
        onChange={onChange}
        value={message}
        onPressEnter={onPressEnter}
      />
    </div>

  )
}

export default CustomFooter
