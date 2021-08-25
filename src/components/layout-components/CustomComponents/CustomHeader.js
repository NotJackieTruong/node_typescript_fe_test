import React, {useState} from "react";
import {Avatar, Button, Dropdown, Layout, Menu} from "antd";
import {useSelector} from "react-redux";
import {UserOutlined, PhoneFilled, VideoCameraFilled, SearchOutlined, MoreOutlined} from "@ant-design/icons";
import CustomAlert from "../../../views/app-views/chat/component/CustomAlert";
import Modal from "antd/es/modal/Modal";

const {Header} = Layout

const CustomHeader = () => {
  const currentChat = useSelector(state => {
    return state.chatReducer.currentChat
  })
  const iconStyle = {
    color: '#007aff',
    fontSize: 24,
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOnClick = (event) => {
    console.log({event: event})
    switch (event.key) {
      case "0":
        console.log('Delete')
        showModal()
        break
      case "1":
        console.log("Option")
        break
      case "2":
        console.log("Another option")
        break
      default:
        console.log("Test")
        break
    }
  }

  const menu = (
    <Menu onClick={handleOnClick}>
      <Menu.Item key={0}>
        Delete
      </Menu.Item>
      <Menu.Item key={1}>
        Option
      </Menu.Item>
      <Menu.Item key={2}>
        Another Option
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className={'d-flex flex-row justify-content-between align-items-center pr-3 pl-3'} style={{
      backgroundColor: '#fff',
    }}>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText={"Delete"}>
        <p>Are you sure to delete this chat?</p>
      </Modal>
      <div className={'d-flex flex-row align-items-center'}>
        {currentChat.avatar ? <Avatar src={currentChat.avatar.url} size={56} style={{marginRight: 8}}/> :
          <Avatar className={'mr-2'} icon={<UserOutlined/>} size={56}/>}
        <h4 className={'font-weight-bold'}>{currentChat.name}</h4>
      </div>
      <div className={'d-flex flex-row align-items-center'}>
        <PhoneFilled className={'mr-2 ml-2'} style={iconStyle}/>
        <VideoCameraFilled className={'mr-2 ml-2'} style={iconStyle}/>
        <SearchOutlined className={'mr-0 ml-2'} style={iconStyle}/>
        <Dropdown overlay={menu} placement="bottomLeft" arrow trigger={['click']}>
          <MoreOutlined className={'mr-1 ml-1'} style={iconStyle} onClick={() => {
          }}/>
        </Dropdown>

      </div>
    </Header>
  )
}

export default CustomHeader
