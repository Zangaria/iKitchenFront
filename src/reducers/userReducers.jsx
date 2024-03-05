import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_LOGIN_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_FORGOT_PASSWORD_REQUEST,
	USER_FORGOT_PASSWORD_SUCCESS,
	USER_FORGOT_PASSWORD_FAIL,
	USER_CHANGE_PASSWORD_REQUEST,
	USER_CHANGE_PASSWORD_SUCCESS,
	USER_CHANGE_PASSWORD_FAIL
} from '../constants/userConstants';

export const userRegisterReducer = (state = { }, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			console.log(action.payload);
			return { loading: false, data: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userLoginReducer = (state = {}, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };
		case USER_LOGIN_SUCCESS:
			console.log(action.payload);
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_FAIL:
			console.log(payload);
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userForgotPasswordReducer = (state = {}, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_FORGOT_PASSWORD_REQUEST:
			return { loading: true };
		case USER_FORGOT_PASSWORD_SUCCESS:
			console.log(action.payload);
			return { loading: false };
		case USER_FORGOT_PASSWORD_FAIL:
			console.log(payload);
			return { loading: false };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userChangePasswordReducer = (state = {}, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_CHANGE_PASSWORD_REQUEST:
			return { loading: true };
		case USER_CHANGE_PASSWORD_SUCCESS:
			console.log(payload);
			return { loading: false };
		case USER_CHANGE_PASSWORD_FAIL:
			console.log(payload);
			return { loading: false };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};
