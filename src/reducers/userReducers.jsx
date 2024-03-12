import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	userInfo: null,
	isAuthenticated: false,
	error: null,
	msg: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		userRegisterRequest: (state) => {
			state.loading = true;
		},
		userRegisterSuccess: (state, action) => {
			state.loading = false;
			state.data = action.payload;
			state.error = null;
		},
		userRegisterFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		userLoginRequest: (state) => {
			state.loading = true;
		},
		userLoginSuccess: (state, action) => {
			console.log('kmm');
			state.loading = false;
			state.userInfo = action.payload;
			state.isAuthenticated = true;
			state.error = null;
		},
		userLoginFail: (state, action) => {
			console.log('done ');
			state.loading = false;
			state.error = action.payload;
		},
		userLogout: (state) => {
			state = {};
		},
		userForgotPasswordRequest: (state) => {
			state.loading = true;
		},
		userForgotPasswordSuccess: (state, action) => {
			state.loading = false;
			state.msg = action.payload.msg;
			state.error = null;
		},
		userForgotPasswordFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		userChangePasswordRequest: (state) => {
			state.loading = true;
		},
		userChangePasswordSuccess: (state) => {
			state.loading = false;
		},
		userChangePasswordFail: (state) => {
			state.loading = false;
		},

		activateUserRequest: (state) => {
			state.loading = true;
		},

		activateUserSuccess: (state) => {
			state.loading = false;
			state.isActive = true;
		},

		activateUserFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	userRegisterRequest,
	userRegisterSuccess,
	userRegisterFail,
	userLoginRequest,
	userLoginSuccess,
	userLoginFail,
	userLogout,
	userForgotPasswordRequest,
	userForgotPasswordSuccess,
	userForgotPasswordFail,
	userChangePasswordRequest,
	userChangePasswordSuccess,
	userChangePasswordFail,
} = userSlice.actions;

export default userSlice.reducer;
