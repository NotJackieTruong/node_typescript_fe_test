import {
  SET_CHATS,
  ADD_CHAT,
  SET_CURRENT_CHAT_MESSAGES,
  SET_CURRENT_CHAT,
  ADD_MESSAGE,
  LOAD_MORE_MESSAGES
} from "../constants/Chat";

export const setChats = (data)=>{
  return {
    type: SET_CHATS,
    payload: data
  }
}

export const addChat = (data)=>{
  return {
    type: ADD_CHAT,
    payload: data
  }
}

export const setCurrentChat = (data)=>{
  return{
    type: SET_CURRENT_CHAT,
    payload: data
  }
}

export const setCurrentChatMessages = (data)=>{
  return{
    type: SET_CURRENT_CHAT_MESSAGES,
    payload: data
  }
}

export const addMessage = (data)=>{
  return{
    type: ADD_MESSAGE,
    payload: data
  }
}

export const loadMoreMessages = (data)=>{
  return{
    type: LOAD_MORE_MESSAGES,
    payload: data
  }
}
