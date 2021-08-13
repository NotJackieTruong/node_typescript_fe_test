import {SET_ACTIVE_USERS} from "../constants/User";

const initState = {
  activeUsers: []
}

const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.payload
      }
    default:
      return {...state}

  }
}

export default UserReducer
