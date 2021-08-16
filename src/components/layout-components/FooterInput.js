import React, {useState} from "react";
import {Button, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import Socket from "../../socket/Socket";

const FooterInput = () => {
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
    <Input
      size={"small"}
      placeholder={"Type a message..."}
      suffix={<Button icon={<SendOutlined/>} onClick={onPressEnter}/>}
      style={{}}
      onChange={onChange}
      value={message}
      onPressEnter={onPressEnter}
    />
  )
}

export default FooterInput
