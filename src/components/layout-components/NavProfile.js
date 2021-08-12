import React from "react";
import {Menu, Dropdown, Avatar} from "antd";
import {connect, useDispatch, useSelector} from 'react-redux'
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import {signOut} from 'redux/actions/Auth';
import {APP_PREFIX_PATH} from "../../configs/AppConfig";

const menuItem = [
  {
    title: "Edit Profile",
    icon: EditOutlined,
    path: `${APP_PREFIX_PATH}/users/me`
  },

  {
    title: "Account Setting",
    icon: SettingOutlined,
    path: "/"
  },

]

export const NavProfile = () => {
  const userInfo = useSelector(state => {
    return state.auth.userInfo
  })
  const dispatch = useDispatch()

  const profileImg = userInfo.avatar;
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg}/>
          <div className="pl-3">
            <h4 className="mb-0">{userInfo.fullName}</h4>
            <span className="text-muted">{userInfo.role}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon}/>
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={e => dispatch(signOut())}>
            <span>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item>
          <Avatar src={profileImg}/>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default connect(null, {signOut})(NavProfile)
