import React from "react";
import {Avatar, Button, Layout} from "antd";
import {useSelector} from "react-redux";
import {UserOutlined, PhoneFilled, VideoCameraFilled, SearchOutlined} from "@ant-design/icons";

const {Header} = Layout

const CustomHeader = () => {
  const currentChat = useSelector(state => {
    return state.chatReducer.currentChat
  })
  return (
    <Header className={'d-flex flex-row justify-content-between align-items-center pr-3 pl-3'} style={{
      backgroundColor: '#fff',
    }}>
      <div className={'d-flex flex-row align-items-center'}>
        {currentChat.avatar ? <Avatar src={currentChat.avatar.url} size={56} style={{marginRight: 8}}/> :
          <Avatar className={'mr-2'} icon={<UserOutlined/>} size={56}/>}
        <h4 className={'font-weight-bold'}>{currentChat.name}</h4>
      </div>
      <div className={'d-flex flex-row align-items-center'}>
        <Button ghost={true} shape={'circle'} className={'mr-2'} icon={<PhoneFilled style={{color: '#007aff'}}/>}/>
        <Button ghost={true} shape={'circle'} className={'mr-2'} icon={<VideoCameraFilled style={{color: '#007aff'}}/>}/>
        <Button ghost={true} shape={'circle'} className={''} icon={<SearchOutlined style={{color: '#007aff'}}/>}/>
      </div>
    </Header>
  )
}

export default CustomHeader
