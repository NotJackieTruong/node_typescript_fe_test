import fetch from 'auth/FetchInterceptor'
import {AUTH_TOKEN} from "../redux/constants/Auth";

const JwtAuthService = {}

JwtAuthService.login = function (data) {
	return fetch({
		url: '/login',
		method: 'post',
		headers: {
      'public-request': 'true'
    },
		data: data
	})
}

JwtAuthService.signUp = function (data) {
	return fetch({
		url: '/signup',
		method: 'post',
		headers: {
      'public-request': 'true',
    },
		data: data
	})
}

JwtAuthService.getMe = function (data){
	return fetch({
		url: '/users/me',
		method: 'get',
		headers: {
		},
		data: {}
	})
}

export default JwtAuthService
