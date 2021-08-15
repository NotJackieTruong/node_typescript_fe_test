import {combineReducers} from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import UserReducer from "./UserReducer";
import ChatReducer from "./ChatReducer";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  userReducer: UserReducer,
  chatReducer: ChatReducer
});

export default reducers;
