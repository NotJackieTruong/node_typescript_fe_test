import {io} from "socket.io-client";
import {env} from '../configs/EnvironmentConfig'
import CONSTANTS from "../utils/constants";
import {setActiveUsers} from "../redux/actions/UserActions";
import {
  addChat,
  addMessage,
  loadMoreMessages,
  setChats,
  setCurrentChatMessages,
  updateMessage
} from "../redux/actions/ChatActions";
import {setUserInfo} from "../redux/actions/Auth";
import {USER_INFO} from "../redux/constants/Auth";
import Utils from "../utils";

class Socket {
  static socket = io(env.API_ENDPOINT_URL, {transports: ['websocket', 'polling', 'flashsocket']})
  static userList = []
  static chatList = []
  static user = {}

  // connected
  static onConnect(user = Utils.getItem(USER_INFO)) {
    this.socket.on("connect", () => {
      console.log('Hello', this.socket.id, user)
      if (user !== null && user !== undefined && JSON.stringify(user) !== "{}") {
        this.socket.emit(CONSTANTS.SOCKET_EVENTS.CONNECTED, user)
      }
    })
  }

  // active users
  static emitGetActiveUsers() {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.GET_ACTIVE_USERS)
  }

  static onGetActiveUsers(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.GET_ACTIVE_USERS, (users) => {
      callback(setActiveUsers(users))
    })
  }

  // login
  static emitLogin(user) {
    this.user = user
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.LOG_IN, user)
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.CONNECTED, user)
  }

  static onLogin(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.LOG_IN, (users) => {
      callback(setActiveUsers(users))
    })
  }

  // logout
  static emitLogout(user) {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.LOG_OUT, user)
  }

  static onLogout(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.LOG_OUT, () => {
    })
  }

  // create new chat
  static emitCreateNewChat(members) {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.CREATE_NEW_CHAT, members)
  }

  static onCreateNewChat(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.CREATE_NEW_CHAT, chat => {
      callback(addChat(chat))
    })
  }

  // get chats
  static emitGetChats() {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.GET_CHATS)
  }

  static onGetChats(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.GET_CHATS, (chats) => {
      callback(setChats(chats))
    })
  }

  // get messages
  static emitGetCurrentChatMessages(chatId) {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.GET_CURRENT_CHAT_MESSAGES, chatId)
  }

  static onGetCurrentChatMessages(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.GET_CURRENT_CHAT_MESSAGES, (messages) => {
      callback(setCurrentChatMessages(messages))
    })
  }

//  send message
  static emitSendMessage(message) {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.SEND_MESSAGE, message)
  }

  static onSendMessage(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.SEND_MESSAGE, (message) => {
      callback(addMessage(message))
    })
  }

//  load more messages
  static emitLoadMoreMessages(chatId, options) {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.LOAD_MORE_MESSAGES, chatId, options)
  }

  static onLoadMoreMessages(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.LOAD_MORE_MESSAGES, (messages) => {
      callback(loadMoreMessages(messages))
    })
  }

//  react a message
  static emitReactMessage(data){
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.REACT_MESSAGE, data)
  }

  static onReactMessage(callback){
    this.socket.on(CONSTANTS.SOCKET_EVENTS.REACT_MESSAGE, (message)=>{
      callback(updateMessage(message))
    })
  }

//  update user profile
  static emitUpdateUser(data){
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.UPDATE_USER, data)

  }

  static onUpdateUser(callback){
    this.socket.on(CONSTANTS.SOCKET_EVENTS.UPDATE_USER, (user)=>{
      callback(setUserInfo(user))
    })
  }
}

export default Socket
