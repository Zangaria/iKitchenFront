import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducers';
import enterpriseReducer from './reducers/enterpriseReducers';
import jobReducer from './reducers/jobReducers';
import searchReducer from './reducers/searchReducers';

// Fetch user info from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: {};

const store = configureStore({
	reducer: {
		user: userReducer,
		enterprise: enterpriseReducer,
		job: jobReducer,
		search: searchReducer,
	},
	preloadedState: {
		user: {
			userInfo: userInfoFromStorage,
		},
	},
});

export default store;
