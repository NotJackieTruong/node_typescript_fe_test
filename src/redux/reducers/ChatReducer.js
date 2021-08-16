import {SET_CHATS, ADD_CHAT} from "../constants/Chat";

const initState = {
  chats: []
}

const ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CHATS:
      return {...state, chats: action.payload}
    case ADD_CHAT:
      let array = [...state.chats]
      array.unshift(action.payload)
      return {...state, chats: array}
    default:
      return {...state}
  }
}

export default ChatReducer
