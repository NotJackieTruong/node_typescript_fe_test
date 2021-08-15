 import {SET_CHATS} from "../constants/Chat";

const initState = {
  chats: []
}

const ChatReducer = (state=initState, action)=>{
  switch (action.type) {
    case SET_CHATS:
      return {...state, chats: action.payload}
    default:
      return {...state}
  }
}

export default ChatReducer
