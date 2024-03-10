import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	error: null,
	enterprise: null,
};

export const enterpriseSlice = createSlice({
	name: 'enterprise',
	initialState,
	reducers: {
		enterpriseCreateRequest: (state) => {
			state.loading = true;
		},
		enterpriseCreateSuccess: (state, action) => {
			state.loading = false;
			state.enterprise = action.payload;
			state.error = null;
		},
		enterpriseCreateFail: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { enterpriseCreateRequest, enterpriseCreateSuccess, enterpriseCreateFail } =
	enterpriseSlice.actions;

export default enterpriseSlice.reducer;
