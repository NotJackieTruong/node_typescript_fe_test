import React, {useState} from "react";
import "../styles/index.css"
import Utils from "../../../../utils";
import ReactionDropdown from "./ReactionDropdown";

const Message = ({isSender, messageInfo, startSequence, endSequence, showTimestamp}) => {
  const timestamp = Utils.formatDate(messageInfo.createdAt) + ' ' + Utils.formatTime(messageInfo.createdAt)
  const [hover, setHover] = useState(false)
  const onMouseOver = ()=>{
    setHover(true)
  }
  const onMouseLeave = ()=>{
    setHover(false)
  }
  return (
    <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={[
      'message',
      `${isSender ? 'mine' : ''}`,
      `${startSequence ? 'start' : ''}`,
      `${endSequence ? 'end' : ''}`
    ].join(' ')}>
      {
        showTimestamp &&
        <div className="timestamp">
          { timestamp }
        </div>
      }

      <div className={`bubble-container ${isSender && 'flex-row-reverse'}`}>
        <div className="bubble">
          { messageInfo.message }
        </div>
        {true && <ReactionDropdown message={messageInfo}/>}
      </div>
    </div>
  )
}

export default Message
