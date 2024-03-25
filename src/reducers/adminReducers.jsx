import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	searchJobs: [],
	searchUsers: [],
	error: null,
	msg: null,
};

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		getAllUsersRequest: (state) => {
			state.loading = true;
		},
		getAllUsersSuccess: (state, { payload }) => {
			state.loading = false;
			state.searchUsers = payload;
			state.error = null;
		},
		getAllUsersFail: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		toggleUserLockRequest: (state) => {
			state.loading = true;
		},
		toggleUserLockSuccess: (state, { payload }) => {
			state.loading = false;
			state.msg = payload;
			state.error = null;
		},
		toggleUserLockFail: (state, { payload }) => {
			state.loading = false;
			state.msg = null;
			state.error = payload;
		},
	},
});

export const {
	getAllUsersRequest,
	getAllUsersSuccess,
	getAllUsersFail,
	toggleUserLockRequest,
	toggleUserLockSuccess,
	toggleUserLockFail,
} = adminSlice.actions;

export default adminSlice.reducer;
