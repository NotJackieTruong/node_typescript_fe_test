import {combineReducers} from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import UserReducer from "./UserReducer";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  userReducer: UserReducer
});

export default reducers;
