import React from "react";
import {useDispatch} from "react-redux";
import {setCurrentRepliedMessage} from "../../../../redux/actions/ChatActions";
import {RetweetOutlined} from '@ant-design/icons'

const ReplyButton = (props) => {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(setCurrentRepliedMessage(props.message))
  }

  return (
    <RetweetOutlined onClick={onClick} className={`align-self-center ${props.isSender ? 'mr-2' : 'ml-2'}`}/>
  )
}

export default ReplyButton
