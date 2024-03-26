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
		addJobToFavoriteJobs: (state, action) => {
			const jobId = action.payload;
			if (state.userInfo) {
				const updatedFavoritesJobs = [...state.userInfo.favoritesJobs, { _id: jobId }];
				state.userInfo.favoritesJobs = updatedFavoritesJobs;
			}
		},

		removeJobFromFavoritesJobs: (state, action) => {
			const jobId = action.payload;
			if (state.userInfo) {
				const updatedFavoritesJobs = state.userInfo.favoritesJobs.filter(
					(job) => job._id !== jobId
				);
				state.userInfo.favoritesJobs = updatedFavoritesJobs;
			}
		},
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

		activateUserSuccess: (state, action) => {
			state.loading = false;
			state.isActive = true;
			state.userInfo = action.payload;
		},

		activateUserFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},

		updateUserDetailsAtRedux: (state, action) => {
			state.userInfo = { ...state.userInfo, ...action.payload };
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
		userUpdateSuccess: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
			state.msg = 'Profile updated successfully';
		},
		userUpdateFail: (state) => {
			state.loading = false;
			state.error = 'Logout failed';
		},
		userUpdateRequest: (state) => {
			state.loading = true;
		},
		getUserInfoRequest: (state) => {
			state.loading = true;
		},
		getUserInfoSuccess: (state, action) => {
			state.loading = false;
			state.userInfo = action.payload;
		},
		getUserInfoFail: (state) => {
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
	userUpdateSuccess,
	userUpdateRequest,
	userUpdateFail,
	updateUserDetailsAtRedux,
	addJobToFavoriteJobs,
	removeJobFromFavoritesJobs,
	getUserInfoRequest,
	getUserInfoSuccess,
	getUserInfoFail,
} = userSlice.actions;

export default userSlice.reducer;
