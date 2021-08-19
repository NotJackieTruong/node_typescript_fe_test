import React, {useEffect, useRef, useState} from "react";
import Socket from "../../../socket/Socket";
import {useDispatch, useSelector} from "react-redux";
import Message from "./component/Message";
import CustomSpin from "./component/CustomSpin";
import {Modal} from "antd";

const Chat = () => {
  const dispatch = useDispatch()
  const chatEndRef = useRef()
  const messageListRef = useRef()

  const {currentChat, currentChatMessages, userInfo} = useSelector(state => {
    return {
      currentChat: state.chatReducer.currentChat,
      currentChatMessages: state.chatReducer.currentChatMessages,
      userInfo: state.auth.userInfo
    }
  })
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [firstTime, setFirstTime] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    Socket.emitGetCurrentChatMessages(currentChat._id)
  }, [currentChat])

  useEffect(() => {
    firstTime && chatEndRef.current?.scrollIntoView({behavior: 'smooth'})
    console.log({currentChatMessages})
  }, [currentChatMessages])

  useEffect(() => {
    console.log({loading, hasMore})
  }, [loading, hasMore])

  const renderMessage = () => {
    return currentChatMessages.map((message, index) => {
      let currentMessage = message
      let prevMessage = currentChatMessages[index - 1]
      let nextMessage = currentChatMessages[index + 1]
      let startSequence = true
      let endSequence = true
      let showTimestamp = true
      let isSender = currentMessage.sender._id === userInfo._id || currentMessage.sender === userInfo._id

      //  check time sequence(ms)
      if (prevMessage) {
        let isPrevSender = prevMessage.sender._id === userInfo._id || prevMessage.sender === userInfo._id
        let timeDiff = new Date(currentMessage.createdAt) - new Date(prevMessage.createdAt)
        if (isPrevSender && timeDiff < 1 * 60 * 60 * 1000) {
          startSequence = false
        }
        if (timeDiff < 1 * 60 * 60 * 1000) {
          showTimestamp = false
        }

      }

      if (nextMessage) {
        let isNextSender = nextMessage.sender._id === userInfo._id || nextMessage.sender === userInfo._id

        let timeDiff = new Date(nextMessage.createdAt) - new Date(currentMessage.createdAt)
        if (isNextSender && timeDiff < 1 * 60 * 60 * 1000) {
          endSequence = false
        }
      }

      return (
        <Message
          key={index}
          isSender={isSender}
          startSequence={startSequence}
          endSequence={endSequence}
          messageInfo={message}
          showTimestamp={showTimestamp}
          showModal={showModal}
        />
      )

    })

  }

  const onLoadMore = () => {
    console.log("Loading more...")
    setLoading(true)
    Socket.emitLoadMoreMessages(currentChat._id, {
      startPage: page + 1,
      docsPerPage: 20
    })
    Socket.onLoadMoreMessages((action) => {
      console.log(action)
      setLoading(false)
      setPage(page + 1)
      action.payload?.length > 0 && dispatch(action)
    })

  }

  const handleOnScroll = (e) => {
    console.log({})
    let scrollTop = e.target.scrollTop
    let scrollHeight = e.target.scrollHeight
    let clientHeight = e.target.clientHeight
    if (scrollTop === 0) {
      onLoadMore()
      setFirstTime(false)
    }
    // check if a div scrolls to bottom
    if (scrollHeight - scrollTop === clientHeight) {
      setFirstTime(true)
    } else {
      setFirstTime(false)
    }

  }


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("ok")
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    console.log("cancel")

  };

  useEffect(()=>{
    console.log({isModalVisible})
  }, [isModalVisible])

  return (
    <div className={'pr-3 pl-3 pb-3'} onScroll={handleOnScroll} style={{overflow: 'auto', height: '100%'}}>
      {loading && <CustomSpin/>}
      {renderMessage()}
      <div ref={chatEndRef}/>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>

  )
}

export default Chat
