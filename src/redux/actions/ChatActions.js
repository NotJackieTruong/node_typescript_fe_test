import {SET_CHATS} from "../constants/Chat";

export const setChats = (data)=>{
  return {
    type: SET_CHATS,
    payload: data
  }
}
