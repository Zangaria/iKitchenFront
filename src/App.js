// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Login from './pages/Login';
import ActivateUser from './components/ActivateUser';
import ChangePassword from './pages/ChangePassword';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Page404 from './pages/page404';

const App = () => {
	return (
		<>
			<Navbar></Navbar>
			<BrowserRouter>
				<Routes>
					<Route>
						<Route path="/" element={<Home />} />
						<Route path="register" element={<Register />} />
						<Route path="activeUser" element={<ActivateUser />} />
						<Route path="login" element={<Login />} />
						<Route path="ForgotPassword" element={<ForgotPassword />} />
						<Route path="changePassword" element={<ChangePassword />} />
						<Route path="/*" element={<Page404 />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
