// App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import Login from './pages/Login';
import ActivateUser from './components/ActivateUser';
import ChangePassword from './pages/ChangePassword';
import CreateEnterprise from './pages/CreateEnterprise';
import CreateJob from './pages/CreateJob';
import Navbar from './components/Navbar';
import Home from './pages/home';
import SearchResults from './pages/SearchResults';
import Page404 from './pages/page404';

const App = () => {
	return (
		<>
			<Navbar></Navbar>
			<BrowserRouter>
				<Routes>
					<Route>
						<Route index element={<Home />} />
						<Route path="register" element={<Register />} />
						<Route path="activeUser" element={<ActivateUser />} />
						<Route path="login" element={<Login />} />
						<Route path="ForgotPassword" element={<ForgotPassword />} />
						<Route path="changePassword" element={<ChangePassword />} />
						<Route path="createEnterprise" element={<CreateEnterprise />} />
						<Route path="createJob" element={<CreateJob />} />
						<Route path="search-results" element={<SearchResults />} />
						<Route path="/*" element={<Page404 />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
