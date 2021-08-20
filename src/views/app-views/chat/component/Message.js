import React, {useEffect, useRef, useState} from "react";
import "../styles/index.css"
import Utils from "../../../../utils";
import ReactionDropdown from "./ReactionDropdown";
import Reaction from "./Reaction";
import ReplyButton from "./ReplyButton";

const Message = ({isSender, messageInfo, startSequence, endSequence, showTimestamp, showModal, showReply}) => {
  const timestamp = Utils.formatDate(messageInfo.createdAt) + ' ' + Utils.formatTime(messageInfo.createdAt)
  const [hover, setHover] = useState(false)
  const onMouseOver = () => {
    setHover(true)
  }
  const onMouseLeave = () => {
    setHover(false)
  }

  return (
    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={[
      'message',
      `${isSender ? 'mine' : ''}`,
      `${startSequence || showReply ? 'start' : ''}`,
      `${endSequence || showReply ? 'end' : ''}`,
      `${messageInfo.reactions && messageInfo.reactions?.length > 0 ? 'mb-3' : ''}`
    ].join(' ')}>
      {
        showTimestamp &&
        <div className="timestamp">
          {timestamp}
        </div>
      }
      {
        showReply &&
        <div className={'reply-container'}>
          <div className={'reply'}>
            {messageInfo.repliesTo.message}
          </div>
        </div>
      }

      <div className={`bubble-container ${isSender && 'flex-row-reverse'} ${showReply && 'has-reply'}`}>
        <div className="bubble">
          {messageInfo.message}
          <Reaction isSender={isSender} reactions={messageInfo.reactions} showModal={showModal}/>

        </div>
        {hover && <ReactionDropdown message={messageInfo} isSender={isSender}/>}
        {hover && <ReplyButton message={messageInfo} isSender={isSender}/>}
      </div>

    </div>
  )
}

export default Message
