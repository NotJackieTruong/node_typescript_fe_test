import {io} from "socket.io-client";
import {env} from '../configs/EnvironmentConfig'
import CONSTANTS from "../utils/constants";

class Socket {
  static socket = io(env.API_ENDPOINT_URL, {transports: ['websocket', 'polling', 'flashsocket']})
  static userList = []
  static chatList = []

  // static setSocket() {
  //   this.socket = io(env.API_ENDPOINT_URL, {transports: ['websocket', 'polling', 'flashsocket']})
  // }

  static emitUserOnline(user) {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.USER_ONLINE, user)
  }

  static emitUserOffline(user) {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.USER_OFFLINE, user)
  }

  static onUserOnline(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.USER_ONLINE, (userList) => {
      this.userList = userList
      callback(userList)
    })
  }

  static onUserOffline(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.USER_OFFLINE, (userList) => {
      this.userList = userList
      callback(userList)
    })
  }

  static emitGetActiveUsers(){
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.GET_ACTIVE_USERS)
  }

  static onGetActiveUsers(callback){
    this.socket.on(CONSTANTS.SOCKET_EVENTS.GET_ACTIVE_USERS, (userList)=>{
      callback(userList)
    })
  }

  static emitCreateNewChat(users){
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.CREATE_NEW_CHAT, users)
  }

  static onCreateNewChat(callback){
    this.socket.on(CONSTANTS.SOCKET_EVENTS.CREATE_NEW_CHAT, chat=>{
      callback(chat)
    })
  }

  static onError(callback){
    this.socket.on(CONSTANTS.SOCKET_EVENTS.ERRORS, error=>{
      callback(error)
    })
  }

}

export default Socket
