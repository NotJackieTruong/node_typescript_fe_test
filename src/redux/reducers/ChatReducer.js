import {
  SET_CHATS,
  ADD_CHAT,
  SET_CURRENT_CHAT_MESSAGES,
  SET_CURRENT_CHAT,
  ADD_MESSAGE,
  LOAD_MORE_MESSAGES, UPDATE_MESSAGE
} from "../constants/Chat";
import Utils from "../../utils";

const initState = {
  chats: [],
  currentChat: {},
  currentChatMessages: []
}

const ChatReducer = (state = initState, action) => {
  let currentChatMessagesClone = [...state.currentChatMessages]
  let chatsClone = [...state.chats]

  switch (action.type) {
    case SET_CHATS:
      return {...state, chats: action.payload}

    case ADD_CHAT:
      chatsClone.unshift(action.payload)
      return {...state, chats: chatsClone}

    case SET_CURRENT_CHAT:
      return {...state, currentChat: action.payload}

    case SET_CURRENT_CHAT_MESSAGES:
      return {...state, currentChatMessages: action.payload}

    case ADD_MESSAGE:
      currentChatMessagesClone.push(action.payload)
      return {...state, currentChatMessages: currentChatMessagesClone}
    case LOAD_MORE_MESSAGES:
      return {...state, currentChatMessages: Utils.removeDuplicate(action.payload.concat(state.currentChatMessages))}
    case UPDATE_MESSAGE:
      let index = state.currentChatMessages.findIndex(item => item._id === action.payload._id)
      currentChatMessagesClone[index] = action.payload
      return {...state, currentChatMessages: currentChatMessagesClone}

    default:
      return {...state}
  }
}

export default ChatReducer
