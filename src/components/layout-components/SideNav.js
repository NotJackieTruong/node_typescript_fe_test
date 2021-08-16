import React, {useEffect, useState} from "react";
import {Avatar, Button, Grid, Layout, Space, Input, Modal, List, Tag} from 'antd';
import {connect, useSelector} from 'react-redux';
import {SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE} from 'constants/ThemeConstant';
import {Scrollbars} from 'react-custom-scrollbars';
import MenuContent from './MenuContent'
import utils from "../../utils";
import {NavProfile} from "./NavProfile";
import {EditOutlined, SearchOutlined, CheckCircleTwoTone} from "@ant-design/icons";
import '../../assets/styles/style.css'
import Socket from "../../socket/Socket";

const {Sider} = Layout;
const {useBreakpoint} = Grid;
const {Search} = Input

export const SideNav = ({navCollapsed, sideNavTheme, routeInfo, hideGroupTitle, localization = true}) => {
  const props = {sideNavTheme, routeInfo, hideGroupTitle, localization}
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('lg')
  const {activeUsers, userInfo} = useSelector(state => {
    return {
      activeUsers: state.userReducer.activeUsers,
      userInfo: state.auth.userInfo
    }
  })
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userModalList, setUserModalList] = useState([])

  useEffect(() => {
    let array = activeUsers.filter(item => item._id !== userInfo._id).map(item => {
      return {...item, isSelected: false}
    })
    setUserModalList(array)
  }, [activeUsers, userInfo])

  const resetState = () => {
    let array = activeUsers.map(item => {
      return {...item, isSelected: false}
    })
    setUserModalList(array)
  }

  const onSearch = () => {

  }
  const showModal = () => {
    setIsModalVisible(true);
  }
  const handleOk = () => {
    setIsModalVisible(false);
    let array = [...userModalList.filter(item => item.isSelected === true), userInfo]
    console.log({array})
    Socket.emitCreateNewChat(array)
    resetState()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClose = () => {
    resetState()
  }

  const onSelect = (item) => {
    let array = [...userModalList]
    let obj = array.find(i => i._id === item._id)
    obj.isSelected = !obj.isSelected
    setUserModalList(array)
  }

  const renderItems = item => (
    <div className={"clickable-list-item"} onClick={() => {
      onSelect(item)
    }}>
      <List.Item extra={item.isSelected ? <CheckCircleTwoTone twoToneColor="#52c41a" size={"large"}/> : <></>}>
        <List.Item.Meta
          className={"d-flex align-items-center"}
          avatar={<Avatar src={item.avatar} size={"large"}/>}
          title={<span>{item.fullName}</span>}
        />
      </List.Item>
    </div>
  )

  return (
    <Sider
      className={`side-nav ${sideNavTheme === SIDE_NAV_DARK ? 'side-nav-dark' : ''}`}
      width={SIDE_NAV_WIDTH}
      collapsed={isMobile}
      style={{top: 0, height: '100%'}}
    >
      <div className={"side-nav-header d-flex align-items-center justify-content-between"}
           style={{padding: '0px 8px', margin: '4px 0 8px 0'}}>
        <NavProfile/>
        <span className={"font-weight-bold"}>Clone</span>
        <Button shape={"circle"} icon={<EditOutlined/>} onClick={showModal}/>
      </div>
      <Space direction={"vertical"} style={{width: '100%', padding: '0px 8px', margin: '4px 0 8px 0'}}>
        <Search placeholder="Search..." size={"small"} onSearch={onSearch}
                enterButton={<Button icon={<SearchOutlined/>}/>}/>
      </Space>
      <Scrollbars autoHide>
        <MenuContent
          type={NAV_TYPE_SIDE}
          {...props}
        />
      </Scrollbars>
      <Modal title="Create new conversation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
             afterClose={handleClose}>
        <div className={"d-flex flex-row align-items-center"}>
          <span className={'font-weight-bold'}>To: </span>
          {userModalList.filter(item => item.isSelected === true).map((item, index) => {
            return (
              <Tag key={index}>{item.fullName}</Tag>
            )
          })}
        </div>
        <List
          itemLayout="horizontal"
          dataSource={userModalList}
          renderItem={renderItems}
          split={false}
        />
      </Modal>
    </Sider>
  )
}

const mapStateToProps = ({theme}) => {
  const {navCollapsed, sideNavTheme} = theme;
  return {navCollapsed, sideNavTheme}
};

export default connect(mapStateToProps)(SideNav);
