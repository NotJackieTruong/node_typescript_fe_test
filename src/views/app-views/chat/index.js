import React, {useEffect} from "react";
import {useParams} from 'react-router-dom'
import Socket from "../../../socket/Socket";
import {useDispatch, useSelector} from "react-redux";
import Utils from "../../../utils";

const Chat = () => {
  const params = useParams()
  const dispatch = useDispatch()

  const {currentChat, currentChatMessages} = useSelector(state => {
    return {
      currentChat: state.chatReducer.currentChat,
      currentChatMessages: state.chatReducer.currentChatMessages
    }
  })

  const dispatchAction = (action) => {
    console.log("action: ", action)
    dispatch(action)
  }

  useEffect(() => {
    Socket.emitGetCurrentChatMessages(currentChat._id)
  }, [currentChat])

  // useEffect(()=>{
  //   Socket.onGetCurrentChatMessages(dispatchAction)
  // })

  return (
    <>
      {currentChatMessages.map((item, index)=>(
        <p key={index}>{item.message}: {Utils.formatTime(item.createdAt)}</p>
      ))}
    </>
  )
}

export default Chat
