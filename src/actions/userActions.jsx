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

export const getEnterprises = () => async (dispatch) => {
	try {
		dispatch(getAllEnterprises());

		const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllEnterprise`);

		if (data) {
			return data;
		}

		if (data.err) {
			console.log(data.msg);
			return data.msg;
		} else {
			dispatch(activateUserSuccess(data.token));
		}
	} catch (err) {
		dispatch(getAllEnterprisesFail(err.response.data.msg));
	}
};

export const getEnterprise = (id) => async (dispatch) => {
	try {
		dispatch(getEnterpriseById());

		const { data } = await axios.get(
			`${process.env.REACT_APP_BASE_URL}/enterprise/byId?entId=${id}`
		);

		if (data) {
			return data;
		}

		if (data.err) {
			console.log(data.msg);
			return data.msg;
		} else {
			dispatch(activateUserSuccess(data.token));
		}
	} catch (err) {
		dispatch(getEnterpriseByIdFail(err.response.data.msg));
	}
};

export const getJobs = () => async (dispatch) => {
	try {
		const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/job/all`);

		if (data) {
			return data;
		}

		if (data.err) {
			return data.msg;
		}
	} catch (err) {
		dispatch(getAllEnterprisesFail(err.response.data.msg));
	}
};

// Frontend action creator
export const updateUserDetails = () => async (dispatch, getState) => {
	const userInfo = getState().user.userInfo; // Access userInfo directly from Redux state
	try {
		dispatch(userUpdateRequest());

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		};

		// Make a request to the server to update user details
		const { data } = await axios.put(
			`${process.env.REACT_APP_BASE_URL}/user/updateUser`,
			userInfo,
			config
		);
		console.log('data', data);
		dispatch(userUpdateSuccess(data.msg));
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

export const deleteJobAction = (jobId) => async (dispatch) => {
	try {
		dispatch(deleteJobRequest());

		const config = {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		};

		const { data } = await axios.delete(
			`${process.env.REACT_APP_BASE_URL}/job/delete?jobId=${jobId}`,
			config
		);

		dispatch(deleteJobSuccess(data.msg));
	} catch (err) {
		dispatch(
			deleteJobFail(err.response && err.response.data.msg ? err.response.data.msg : err.message)
		);
	}
};

//get users
export const getUsers = () => async (dispatch) => {
	try {
		dispatch(getAllUsersRequest());
		const config = {
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/userInfo`, config);

		if (data?.err) {
			dispatch(getAllUsersFail(data.err.msg));
		} else {
			dispatch(getAllUsersSuccess(data));
		}
	} catch (err) {
		dispatch(getAllUsersFail(err.response.data.msg));
	}
};

export const toggleUserLock = (userId) => async (dispatch) => {
	try {
		dispatch(toggleUserLockRequest());
		const config = {
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.patch(
			`${process.env.REACT_APP_BASE_URL}/user/toggleLock?id=${userId}`,
			config
		);

		if (res?.err) {
			dispatch(toggleUserLockFail(res.data.err.msg));
			return false;
		} else {
			dispatch(toggleUserLockSuccess());
			return true;
		}
	} catch (error) {
		dispatch(toggleUserLockFail(error.data.err.msg));
		return false;
	}
};

export const updateJobAction = (updatedJobData) => async (dispatch) => {
	try {
		dispatch(updateJobRequest());

		const config = {
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.patch(
			`${process.env.REACT_APP_BASE_URL}/job/updateJob`,
			updatedJobData,
			config
		);

		dispatch(updateJobSuccess(data.msg));
	} catch (err) {
		dispatch(
			updateJobFail(err.response && err.response.data.msg ? err.response.data.msg : err.message)
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

const getAllEnterprises = createAction('admin/getAllEnterprises');
const getAllEnterprisesFail = createAction('admin/getAllEnterprisesFail');

const getEnterpriseById = createAction('admin/getEnterpriseById');
const getEnterpriseByIdFail = createAction('admin/getEnterpriseByIdFail');

const userUpdateRequest = createAction('user/userUpdateRequest');
const userUpdateSuccess = createAction('user/userUpdateSuccess');
const userUpdateFail = createAction('user/userUpdateFail');

const userLogoutRequest = createAction('user/userLogoutRequest');
const userLogoutSuccess = createAction('user/userLogoutSuccess');
const userLogoutFail = createAction('user/userLogoutFail');

const deleteJobRequest = createAction('jobs/deleteJobRequest');
const deleteJobSuccess = createAction('jobs/deleteJobSuccess');
const deleteJobFail = createAction('jobs/deleteJobFail');

//Eliran get users, delete user, for admin page 22/03/24
const getAllUsersRequest = createAction('admin/getAllUsersRequest');
const getAllUsersSuccess = createAction('admin/getAllUsersSuccess');
const getAllUsersFail = createAction('admin/getAllUsersFail');

const toggleUserLockRequest = createAction('admin/toggleUserLock');
const toggleUserLockFail = createAction('admin/toggleUserLockFail');
const toggleUserLockSuccess = createAction('admin/toggleUserLockSuccess');
//end

const updateJobRequest = createAction('jobs/updateJobRequest');
const updateJobSuccess = createAction('jobs/updateJobSuccess');
const updateJobFail = createAction('jobs/updateJobFail');
