import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import {
	userRegisterReducer,
	userLoginReducer,
	userForgotPasswordReducer,
	userChangePasswordReducer,
} from './reducers/userReducers';
import { newIngredientReducer } from './reducers/ingredientReducers';

// Create the Redux reducer
const reducer = combineReducers({
	userRegister: userRegisterReducer,
	userLogin: userLoginReducer,
	userForgotPassword: userForgotPasswordReducer,
	userChangePassword: userChangePasswordReducer,
});

// Fetch user info from localStorage if available
let userInfoFromStorage = localStorage.getItem('userInfo');
if (userInfoFromStorage) {
	userInfoFromStorage = userInfoFromStorage;
} else {
	userInfoFromStorage = null;
}

const initialState = {
	userLogin: { userInfoFromStorage },
};

const store = configureStore({
	reducer,
	preloadedState: initialState,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
