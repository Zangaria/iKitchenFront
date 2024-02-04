import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { thunk } from 'redux-thunk'
import { userRegisterReducer, userLoginReducer, userForgotPasswordReducer } from './reducers/userReducers'

// Create the Redux reducer
const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userForgotPassword: userForgotPasswordReducer
})

// Fetch user info from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfoFromStorage },
}

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store
