import { createAction } from '@reduxjs/toolkit';
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
			console.log('data', data);

			localStorage.setItem('token', data.token);
			localStorage.setItem('userInfo', JSON.stringify(data.user));
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
			console.log(data.err);
			dispatch(userForgotPasswordFail(data.msg));
		} else {
			dispatch(userForgotPasswordSuccess(data));
		}
	} catch (err) {
		dispatch(
			userForgotPasswordFail(
				err.response && err.response.data.error ? err.response.data.error : err.message
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
			console.log(data);
			localStorage.setItem('token', data.token);
			localStorage.setItem('userInfo', JSON.stringify(data.user));
			dispatch(activateUserSuccess(data.user));
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

// Frontend action creator
export const updateUserDetails = () => async (dispatch, getState) => {
	const userInfo = getState().user.userInfo;
	try {
		dispatch(userUpdateRequest());

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		};

		// Make a request to the server to update user details

		const { data } = await axios.patch(
			`https://api-iwork.amio.co.il/user/updateUser`,
			userInfo,
			config
		);

		// Remove existing userInfo from local storage
		localStorage.removeItem('userInfo');

		// Insert new userInfo into local storage
		localStorage.setItem('userInfo', JSON.stringify(data));

		console.log('data', data);
		dispatch(userUpdateSuccess(data));
	} catch (err) {
		dispatch(
			userUpdateFail(err.response && err.response.data.msg ? err.response.data.msg : err.message)
		);
	}
};

export const userLogout = () => (dispatch, getState) => {
	try {
		dispatch(userLogoutRequest());

		localStorage.removeItem('userInfo');
		localStorage.removeItem('token');
		dispatch(userLogoutSuccess());
	} catch (error) {
		// If there's an error during logout, dispatch the failure action
		dispatch(userLogoutFail(error.message));
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

const userUpdateRequest = createAction('user/userUpdateRequest');
const userUpdateSuccess = createAction('user/userUpdateSuccess');
const userUpdateFail = createAction('user/userUpdateFail');

const userLogoutRequest = createAction('user/userLogoutRequest');
const userLogoutSuccess = createAction('user/userLogoutSuccess');
const userLogoutFail = createAction('user/userLogoutFail');
