import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducers';
import enterpriseReducer from './reducers/enterpriseReducers';
import jobReducer from './reducers/jobReducers';
import searchReducer from './reducers/searchReducers';
import { json } from 'react-router-dom';

// Fetch user info from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo');
let parsedUserInfo = null;

if (userInfoFromStorage) {
	try {
		parsedUserInfo = JSON.parse(userInfoFromStorage);
	} catch (error) {
		console.error('Error parsing user info from localStorage:', error);
		// Handle the error or set a default value for parsedUserInfo
		parsedUserInfo = null;
	}
}

if (userInfoFromStorage === undefined) {
	parsedUserInfo = null;
}

const store = configureStore({
	reducer: {
		user: userReducer,
		enterprise: enterpriseReducer,
		job: jobReducer,
		search: searchReducer,
	},
	preloadedState: {
		user: {
			userInfo: parsedUserInfo,
		},
	},
});

export default store;
