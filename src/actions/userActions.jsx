import axios from 'axios';
import {
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_FORGOT_PASSWORD_REQUEST,
	USER_FORGOT_PASSWORD_SUCCESS,
	USER_FORGOT_PASSWORD_FAIL,
	ACTIVATE_USER_REQUEST,
	ACTIVATE_USER_SUCCESS,
	ACTIVATE_USER_FAIL,
	USER_CHANGE_PASSWORD_REQUEST,
	USER_CHANGE_PASSWORD_SUCCESS,
	USER_CHANGE_PASSWORD_FAIL,
} from '../constants/userConstants';

export const registerAction = (userData) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		console.log(`${process.env.REACT_APP_BASE_URL}/user/register`);
		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/user/register`,
			userData,
			config
		);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data.msg,
		});
		console.log(data);
		localStorage.setItem(data);
	} catch (err) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload: err.response && err.response.data.msg ? err.response.data.msg : err.msg,
		});
	}
};

export const loginAction = (userData) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/user/login`,
			userData,
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('token', data.token);
		localStorage.setItem('userName', data.userName);
	} catch (err) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: err.response && err.response.data.msg ? err.response.data.msg : err.msg,
		});
	}
};

// Action creator for user forgot password
export const forgotPasswordAction = (email) => async (dispatch) => {
	try {
		dispatch({
			type: USER_FORGOT_PASSWORD_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/user/forgotPassword`,
			{ email },
			config
		);

		dispatch({
			type: USER_FORGOT_PASSWORD_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: USER_FORGOT_PASSWORD_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};

export const activateUserAction = (userid) => async (dispatch) => {
	try {
		dispatch({
			type: ACTIVATE_USER_REQUEST,
		});
		console.log(`${process.env.REACT_APP_BASE_URL}/user/activeUser?userid=${userid}`);
		// Make an API call to activate the user and get the token
		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/user/activeUser?userid=${userid}`
		);
		console.log(data);
		localStorage.setItem('token', data.token);
		dispatch({
			type: ACTIVATE_USER_SUCCESS,
			payload: data.token,
		});
	} catch (err) {
		console.log(err.response.data.msg);
		dispatch({
			type: ACTIVATE_USER_FAIL,
			payload: err.response.data.msg,
		});
	}
};

export const changePasswordAction = (currentPassword, newPassword, token) => async (dispatch) => {
	try {
		dispatch({
			type: USER_CHANGE_PASSWORD_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		};

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BASE_URL}/user/changePassword`,
			{ currentPassword, newPassword },
			config
		);

		dispatch({
			type: USER_CHANGE_PASSWORD_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: USER_CHANGE_PASSWORD_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};
