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
import UserDetailsPage from './pages/UserDetailsPage';
import Navbar from './components/Navbar';
import Page404 from './pages/page404';
import EnterprisesTable from './pages/EnterprisesTable';
import JobsTable from './pages/JobsTable';
import SearchResults from './pages/SearchResults';
import SubmitCv from './pages/SubmitCv';
import SavedJobsPage from './pages/SavedJobsPage';
import MyJobs from './pages/MyJobs';
import Footer from './components/Footer';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar></Navbar>
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
						<Route path="EnterprisesTable" element={<EnterprisesTable />} />
						<Route path="JobsTable" element={<JobsTable />} />
						<Route path="search-results" element={<SearchResults />} />
						<Route path="user-details" element={<UserDetailsPage />} />
						<Route path="submit-cv/:jobid" element={<SubmitCv />} />
						<Route path="saved-jobs" element={<SavedJobsPage />} />
						<Route path="my-jobs" element={<MyJobs />} />
						<Route path="/*" element={<Page404 />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Footer></Footer>
		</>
	);
};

export default App;
