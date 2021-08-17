import React, {useEffect, useRef, useState} from "react";
import Socket from "../../../socket/Socket";
import {useDispatch, useSelector} from "react-redux";
import Message from "./component/Message";
import InfiniteScroll from 'react-infinite-scroller'
import CustomSpin from "./component/CustomSpin";

const Chat = () => {
  const dispatch = useDispatch()
  const chatEndRef = useRef()

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

  useEffect(() => {
    Socket.emitGetCurrentChatMessages(currentChat._id)
  }, [currentChat])

  useEffect(() => {
    // chatEndRef.current?.scrollIntoView({behavior: 'smooth'})
    console.log({currentChatMessages})
  }, [currentChatMessages])

  const renderMessage = () => {
    return currentChatMessages.map((chat, index) => {
      let currentMessage = chat
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
          messageInfo={chat}
          showTimestamp={showTimestamp}
        />
      )

    })

  }

  const onLoadMore = () => {
    console.log("Loading more...")
    // setPage(page + 1)
    setLoading(true)
    Socket.emitLoadMoreMessages(currentChat._id, {
      startPage: page + 1,
      docsPerPage: 20
    })

  }

  useEffect(() => {
    Socket.onLoadMoreMessages((action) => {
      console.log({action})
      setLoading(false)
      setPage(page + 1)
      setHasMore(action.payload?.length < 0)
      action.payload?.length>0 && dispatch(action)

    })
  })


  return (
    <div style={{}}>
      {renderMessage()}
      <div ref={chatEndRef}/>
    </div>
    // <div style={{height: '700px', width: '100%', overflowY: "auto"}}>
    //   {loading && hasMore && <CustomSpin/>}
    //   <InfiniteScroll
    //     pageStart={0}
    //     loadMore={() => {
    //       onLoadMore()
    //     }}
    //     hasMore={hasMore}
    //     // loader={<div className="loader" key={0}>Loading ...</div>}
    //     useWindow={false}
    //     isReverse={true}
    //     initialLoad={false}
    //     threshold={400}
    //   >
    //     {renderMessage()}
    //   </InfiniteScroll>
    //   <div ref={chatEndRef}/>
    //
    // </div>
  )
}

export default Chat
