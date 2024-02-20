// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Login from './pages/Login';
import ActivateUser from './components/ActivateUser';
import ChangePassword from './pages/ChangePassword';
import Navbar from './components/Navbar';
import AddRecipePage from './pages/AddRecipePage';

const App = () => {
	return (
		<>
			<Navbar></Navbar>
			<BrowserRouter>
				<Routes>
					<Route>
						<Route path="ForgotPassword" element={<ForgotPassword />} />
						<Route path="Register" element={<Register />} />
						<Route path="Login" element={<Login />} />
						<Route path="activeUser" element={<ActivateUser />} />
						<Route path="login" element={<Login />} />
						<Route path="forgotPassword" element={<ForgotPassword />} />
						<Route path="changePassword" element={<ChangePassword />} />
						<Route path="addRecipe" element={<AddRecipePage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
