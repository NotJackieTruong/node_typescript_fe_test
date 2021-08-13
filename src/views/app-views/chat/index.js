import React from "react";
import {useParams} from 'react-router-dom'

const Chat = () => {
  const params = useParams()
  console.log({params})
  return (
    <span>User id: {params.id}</span>
  )
}

export default Chat
