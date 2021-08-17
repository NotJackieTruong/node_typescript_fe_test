import React from "react";
import "../styles/index.css"
import Utils from "../../../../utils";

const Message = ({isSender, messageInfo, startSequence, endSequence, showTimestamp}) => {
  const style = {
    backgroundColor: isSender ? 'lightblue' : '#fff',
    color: isSender ? '#fff' : '#000',
    width: 'fit-content',
    maxWidth: '50%',
    overflowWrap: 'break-word',
    padding: 8,
    borderRadius: 16,
  }
  const timestamp = Utils.formatDate(messageInfo.createdAt) + ' ' + Utils.formatTime(messageInfo.createdAt)
  return (
    <div className={[
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

      <div className="bubble-container">
        <div className="bubble">
          { messageInfo.message }
        </div>
      </div>
    </div>
  )
}

export default Message
