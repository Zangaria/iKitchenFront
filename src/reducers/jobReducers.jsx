import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	error: null,
	job: null,
};

export const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		jobCreateRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		jobCreateSuccess: (state, action) => {
			state.loading = false;
			state.job = action.payload;
			state.error = null;
		},
		jobCreateFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.job = null;
		},
		cvAddRequest: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.job = null;
		},
		cvAddSuccess: (state, action) => {
			state.loading = false;
			state.job = action.payload;
			state.error = null;
		},
		cvAddFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.job = null;
		},
	},
});

export const {
	jobCreateRequest,
	jobCreateSuccess,
	jobCreateFail,
	cvAddRequest,
	cvAddSuccess,
	cvAddFail,
} = jobSlice.actions;

export default jobSlice.reducer;
