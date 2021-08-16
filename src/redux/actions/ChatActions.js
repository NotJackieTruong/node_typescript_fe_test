import {SET_CHATS, ADD_CHAT} from "../constants/Chat";

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
