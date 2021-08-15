import {io} from "socket.io-client";
import {env} from '../configs/EnvironmentConfig'
import CONSTANTS from "../utils/constants";
import {setActiveUsers} from "../redux/actions/UserActions";
import {setChats} from "../redux/actions/ChatActions";
import {setUserInfo} from "../redux/actions/Auth";
import {USER_INFO} from "../redux/constants/Auth";
import Utils from "../utils";

class Socket {
  static socket = io(env.API_ENDPOINT_URL, {transports: ['websocket', 'polling', 'flashsocket']})
  static userList = []
  static chatList = []
  static user = {}

  // static setSocket() {
  //   this.socket = io(env.API_ENDPOINT_URL, {transports: ['websocket', 'polling', 'flashsocket']})
  // }

  static onConnect(user = Utils.getItem(USER_INFO)) {
    this.socket.on("connect", () => {
      console.log('hello', this.socket.id, user)
      if (user !== null && user !== undefined && JSON.stringify(user) !== "{}") {
        console.log("emit")
        this.socket.emit(CONSTANTS.SOCKET_EVENTS.CONNECTED, user)
      }
    })
  }

  static emitGetActiveUsers(){
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.GET_ACTIVE_USERS)
  }

  static onGetActiveUsers(callback){
    this.socket.on(CONSTANTS.SOCKET_EVENTS.GET_ACTIVE_USERS, (users)=>{
      callback(setActiveUsers(users))
    })
  }

  static emitLogin(user) {
    this.user = user
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.LOG_IN, user)
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.CONNECTED, user)
  }

  static onLogin(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.LOG_IN, (user) => {
      callback(setUserInfo(user))
    })
  }

  static emitLogout(user) {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.LOG_OUT, user)
  }

  static onLogout(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.LOG_OUT, () => {
    })
  }

  static emitCreateNewChat(users) {
    this.socket.emit(CONSTANTS.SOCKET_EVENTS.CREATE_NEW_CHAT, users)
  }

  static onCreateNewChat(callback) {
    this.socket.on(CONSTANTS.SOCKET_EVENTS.CREATE_NEW_CHAT, chats => {
      console.log({chats})
      callback(setChats(chats))
    })
  }

  // static onError(callback) {
  //   this.socket.on(CONSTANTS.SOCKET_EVENTS.ERRORS, error => {
  //     callback(error)
  //   })
  // }

}

export default Socket
