import React, {useEffect, useRef, useState} from "react";
import "../styles/index.css"
import Utils from "../../../../utils";
import ReactionDropdown from "./ReactionDropdown";
import Reaction from "./Reaction";

const Message = ({isSender, messageInfo, startSequence, endSequence, showTimestamp, showModal}) => {
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
      `${startSequence ? 'start' : ''}`,
      `${endSequence ? 'end' : ''}`,
      `${messageInfo.reactions && messageInfo.reactions?.length > 0 ? 'mb-3' : ''}`
    ].join(' ')}>
      {
        showTimestamp &&
        <div className="timestamp">
          {timestamp}
        </div>
      }

      <div className={`bubble-container ${isSender && 'flex-row-reverse'}`}>
        <div className="bubble">
          {messageInfo.message}
          <Reaction isSender={isSender} reactions={messageInfo.reactions} showModal={showModal}/>

        </div>
        {hover && <ReactionDropdown message={messageInfo} isSender={isSender}/>}
      </div>

    </div>
  )
}

export default Message
