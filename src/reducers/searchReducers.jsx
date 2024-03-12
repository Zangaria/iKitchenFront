// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchTerm: '',
	searchResults: [],
	isLoading: false,
	error: null,
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchTerm(state, action) {
			state.searchTerm = action.payload;
		},
		searchRequest(state) {
			state.isLoading = true;
			state.error = null;
		},
		searchSuccess(state, action) {
			state.searchResults = action.payload;
			state.isLoading = false;
		},
		searchFail(state, action) {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { setSearchTerm, searchRequest, searchSuccess, searchFail } = searchSlice.actions;

export default searchSlice.reducer;
