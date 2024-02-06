// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Login from './pages/Login';
import ActivateUser from './components/ActivateUser';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route>
					<Route path="ForgotPassword" element={<ForgotPassword />} />
					<Route path="Register" element={<Register />} />
					<Route path="Login" element={<Login />} />
					<Route path="activeUser" element={<ActivateUser />} />
					<Route path="login" element={<Login />} />
					<Route path="forgotPassword" element={<ForgotPassword />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
