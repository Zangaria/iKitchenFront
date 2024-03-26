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
		addJobToFavoriteRequest: (state) => {},
		addJobToFavoriteSuccess: (state, action) => {},
		addJobToFavoriteFail: (state, action) => {},
	},
	removeJobFromFavoritesRequest: (state) => {},
	removeJobFromFavoritesSuccess: (state, action) => {},
	removeJobFromFavoritesFail: (state, action) => {
		state.error = action.payload;
	},
});

export const {
	jobCreateRequest,
	jobCreateSuccess,
	jobCreateFail,
	cvAddRequest,
	cvAddSuccess,
	cvAddFail,
	addJobToFavoriteRequest,
	addJobToFavoriteSuccess,
	addJobToFavoriteFail,
	removeJobFromFavoritesRequest,
	removeJobFromFavoritesFail,
	removeJobFromFavoritesSuccess,
} = jobSlice.actions;

export default jobSlice.reducer;
