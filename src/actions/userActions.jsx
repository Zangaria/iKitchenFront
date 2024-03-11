import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Action creator for user registration
export const registerAction = (userData) => async (dispatch) => {
	console.log(userData);
	try {
		dispatch(userRegisterRequest());

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/user/register`,
			userData,
			config
		);

		dispatch(userRegisterSuccess(data.msg));
	} catch (err) {
		dispatch(
			userRegisterFail(err.response && err.response.data.msg ? err.response.data.msg : err.message)
		);
	}
};

// Action creator for user login
export const loginAction = (userData) => async (dispatch) => {
	try {
		dispatch(userLoginRequest());

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

		if (data.err) {
			dispatch(userLoginFail(data.msg));
		} else {
			dispatch(userLoginSuccess(data));

			localStorage.setItem('token', data.token);
			// localStorage.setItem('userName', data.userName);
		}
	} catch (err) {
		dispatch(
			userLoginFail(err.response && err.response.data.msg ? err.response.data.msg : err.message)
		);
	}
};

// Action creator for user forgot password
export const forgotPasswordAction = (email) => async (dispatch) => {
	try {
		dispatch(userForgotPasswordRequest());

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

		if (data.err) {
			dispatch(userForgotPasswordFail(data.err));
		} else {
			dispatch(userForgotPasswordSuccess(data));
		}
	} catch (err) {
		dispatch(
			userForgotPasswordFail(
				err.response && err.response.data.message ? err.response.data.message : err.message
			)
		);
	}
};

// Action creator for activating user account
export const activateUserAction = (userid) => async (dispatch) => {
	try {
		dispatch(activateUserRequest());

		const { data } = await axios.get(
			`${process.env.REACT_APP_BASE_URL}/user/activeUser?userid=${userid}`
		);
		console.log(`${process.env.REACT_APP_BASE_URL}/user/activeUser?userid=${userid}`);
		console.log(data);

		if (data.err) {
			dispatch(activateUserFail(data.msg));
		} else {
			console.log(data.token);
			localStorage.setItem('token', data.token);
			dispatch(activateUserSuccess(data.token));
		}
	} catch (err) {
		dispatch(activateUserFail(err.response.data.msg));
	}
};

// Action creator for changing user password
export const changePasswordAction = (currentPassword, newPassword, token) => async (dispatch) => {
	try {
		dispatch(userChangePasswordRequest());

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

		dispatch(userChangePasswordSuccess(data));
	} catch (err) {
		dispatch(
			userChangePasswordFail(
				err.response && err.response.data.message ? err.response.data.message : err.message
			)
		);
	}
};

// Create action creators using createAction
const userRegisterRequest = createAction('user/userRegisterRequest');
const userRegisterSuccess = createAction('user/userRegisterSuccess');
const userRegisterFail = createAction('user/userRegisterFail');

const userLoginRequest = createAction('user/userLoginRequest');
const userLoginSuccess = createAction('user/userLoginSuccess');
const userLoginFail = createAction('user/userLoginFail');

const userForgotPasswordRequest = createAction('user/userForgotPasswordRequest');
const userForgotPasswordSuccess = createAction('user/userForgotPasswordSuccess');
const userForgotPasswordFail = createAction('user/userForgotPasswordFail');

const activateUserRequest = createAction('user/activateUserRequest');
const activateUserSuccess = createAction('user/activateUserSuccess');
const activateUserFail = createAction('user/activateUserFail');

const userChangePasswordRequest = createAction('user/userChangePasswordRequest');
const userChangePasswordSuccess = createAction('user/userChangePasswordSuccess');
const userChangePasswordFail = createAction('user/userChangePasswordFail');
