import React from "react";
import {CloseCircleOutlined, RetweetOutlined} from "@ant-design/icons";
import CONSTANTS from "../../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentRepliedMessage} from "../../../redux/actions/ChatActions";

const CurrentRepliedMessagePreview = () => {
  const dispatch = useDispatch()
  const currentRepliedMessage = useSelector(state => {
    return state.chatReducer.currentRepliedMessage
  })

  const onCloseReplyingMessage = () => {
    dispatch(setCurrentRepliedMessage({}))
  }
  return (
    <>
      {Object.keys(currentRepliedMessage).length > 0 &&
      <div className={'mr-1 ml-1 mt-1 pl-3 pr-3 pt-2 pb-2'} style={{
        backgroundColor: '#ebebeb',
        borderRadius: 16,
        position: 'relative'
      }}>
        <p className={'mb-0'}>
          <RetweetOutlined className={`align-self-center`}/> Replying to <span
          className={'font-weight-bold'}>{currentRepliedMessage.sender.fullName}</span>
        </p>
        <p className={'mb-0'} style={{color: '#000'}}>{currentRepliedMessage.message}</p>
        <CloseCircleOutlined
          className={'mt-2 mr-2'}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            fontSize: CONSTANTS.STYLES.ICON_SIZE,
          }} onClick={onCloseReplyingMessage}/>
      </div>
      }
    </>
  )
}

export default CurrentRepliedMessagePreview
