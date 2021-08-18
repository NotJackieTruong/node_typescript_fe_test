import React, {useState} from "react";
import "../styles/index.css"
import Utils from "../../../../utils";
import {Button, Dropdown, Menu} from "antd";
import {SmileOutlined} from '@ant-design/icons'

const reactionArray = [
  '❤', '😂', '😮', '😞', '😡', '👍', '👎'
]



const ReactionDropdown = (props) => {
  const onSelect= ({item , key})=>{
    console.log("Select: ", key)
  }

  const menu = ()=>(
    <Menu onClick={onSelect} className={'d-flex flex-row pl-2 pr-2'} style={{borderRadius: 50}}>
      {reactionArray.map((item, index)=>(
        <Menu.Item key={item} className={'p-2'}>
          <h2 className={'mb-0'}>{item}</h2>
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button className={'align-self-center mr-2'} shape={'circle'} icon={<SmileOutlined/>}/>
    </Dropdown>
  )
}

export default ReactionDropdown
