import {
	AUTH_TOKEN,
	AUTHENTICATED,
	SHOW_AUTH_MESSAGE,
	HIDE_AUTH_MESSAGE,
	SIGNOUT_SUCCESS,
	SIGNUP_SUCCESS,
	SHOW_LOADING,
	HIDE_LOADING,
	SIGNIN_WITH_GOOGLE_AUTHENTICATED,
	SIGNIN_WITH_FACEBOOK_AUTHENTICATED,
	SET_USER_INFO, SIGNOUT
} from '../constants/Auth';

const initState = {
  loading: false,
  message: '',
  showMessage: false,
  redirect: '',
  token: sessionStorage.getItem(AUTH_TOKEN),
	userInfo: {}
}

const auth = (state = initState, action) => {
	switch (action.type) {
		case AUTHENTICATED:
			return {
				...state,
				loading: false,
				redirect: '/',
				token: action.token
			}
		case SHOW_AUTH_MESSAGE:
			return {
				...state,
				message: action.message,
				showMessage: true,
				loading: false
			}
		case HIDE_AUTH_MESSAGE:
			return {
				...state,
				message: '',
				showMessage: false,
			}
		case SIGNOUT:
		case SIGNOUT_SUCCESS: {
			return {
				...state,
				token: null,
				redirect: '/',
				loading: false
			}
		}
		case SIGNUP_SUCCESS: {
			return {
			  ...state,
			  loading: false,
			  token: action.token
			}
		}
		case SHOW_LOADING: {
			return {
				...state,
				loading: true
			}
		}
		case HIDE_LOADING: {
			return {
				...state,
				loading: false,
			}
		}
		case SIGNIN_WITH_GOOGLE_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SIGNIN_WITH_FACEBOOK_AUTHENTICATED: {
			return {
				...state,
				loading: false,
				token: action.token
			}
		}
		case SET_USER_INFO:{
			return{
				...state,
				userInfo: action.payload
			}
		}
		default:
			return state;
	}
}

export default auth
