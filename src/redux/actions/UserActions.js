import {SET_ACTIVE_USERS} from "../constants/User";

export const setActiveUsers = (data) => {
  return {
    type: SET_ACTIVE_USERS,
    payload: data
  }
}
