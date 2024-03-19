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
			state.loading = false;
			state.userInfo = action.payload.user;
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
		toggleFavoriteJob: (state, action) => {
			const jobId = action.payload;
			// console.log(jobId);
			const index = state.userInfo.favoritesJobs.indexOf(jobId);
			if (index !== -1) {
				// Job is already in favorites, remove it
				state.userInfo.favoritesJobs.splice(index, 1);
			} else {
				// Job is not in favorites, add it
				state.userInfo.favoritesJobs.push(jobId);
			}
		},
		userLogoutRequest: (state) => {
			state.loading = true;
		},
		userLogoutSuccess: (state) => {
			state.loading = false;
			state.userInfo = null;
		},
		userLogoutFail: (state) => {
			state.loading = false;
			state.error = 'Logout failed';
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
	toggleFavoriteJob,
} = userSlice.actions;

export default userSlice.reducer;
