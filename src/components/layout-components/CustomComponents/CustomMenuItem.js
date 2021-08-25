import React from "react";
import {Avatar, Menu} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

const CustomMenuItem = (props) => {
  return (
    <Menu.Item key={props.key} style={{
      height: 'fit-content',
      paddingLeft: '20%',
    }}>
      {props.avatar ? <Avatar src={props?.avatar} size={56} style={{marginRight: 8}}/> :
        <Avatar icon={<UserOutlined/>} size={56} style={{marginRight: 8}}/>
      }
      <span>{props?.title}</span>
      {props.path ? <Link onClick={props.closeMobileNav} to={props.path}/> : null}
    </Menu.Item>
  )
}

export default CustomMenuItem
