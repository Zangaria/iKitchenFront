// searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchTerm: '',
	searchResults: [],
	suggestions: [],
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
			state.suggestions = action.payload.map((job) => job.title);
			state.isLoading = false;
		},
		searchFail(state, action) {
			state.error = action.payload;
			state.suggestions = [];
			state.isLoading = false;
		},
		setSuggestions(state, action) {
			state.suggestions = action.payload;
		},
	},
});

export const { setSearchTerm, searchRequest, searchSuccess, searchFail, setSuggestions } =
	searchSlice.actions;

export default searchSlice.reducer;
