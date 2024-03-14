import React, { useState } from 'react';
import websiteLogo from '../images/website-logo.png';
import { useSelector } from 'react-redux';

const Navbar = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [showUserDetailsDropdown, setShowUserDetailsDropdown] = useState(false);
	const [showCreateDropdown, setShowCreateDropdown] = useState(false);
	// const currentUser = useSelector((state) => state.user);
	const currentUser = {
		name: 'John Doe',
		userType: 1,
	};
	const toggleMobileMenu = () => {
		setMobileMenuOpen(!isMobileMenuOpen);
	};

	const toggleUserDetailsDropdown = () => {
		setShowUserDetailsDropdown(!showUserDetailsDropdown);
	};

	const toggleCreateDropdown = () => {
		setShowCreateDropdown(!showCreateDropdown);
	};

	return (
		<nav className="bg-white sticky top-0">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between items-center py-1">
					<div className="flex items-center">
						<a
							//  href="https://flowbite.com/"
							href="/"
							className="flex items-center space-x-3"
						>
							<img src={websiteLogo} className="h-16" alt="Flowbite Logo" />
						</a>
					</div>
					<div className="hidden md:flex space-x-4">
						<a href="/" className="text-gray-800 hover:text-teal-500">
							Home
						</a>
						<a href="register" className="text-gray-800 hover:text-teal-500">
							Register
						</a>
						<a href="activeUser" className="text-gray-800 hover:text-teal-500">
							activeUser
						</a>
						<a href="login" className="text-gray-800 hover:text-teal-500">
							Login
						</a>
						<a href="ForgotPassword" className="text-gray-800 hover:text-teal-500">
							ForgotPassword
						</a>
						<a href="changePassword" className="text-gray-800 hover:text-teal-500">
							changePassword
						</a>
						<a href="createEnterprise" className="text-gray-800 hover:text-teal-500">
							createEnterprise
						</a>
						<a href="createJob" className="text-gray-800 hover:text-teal-500">
							createJob
						</a>

						<a href="user-details" className="text-gray-800 hover:text-teal-500">
							user-details
						</a>
					</div>

					{currentUser?.userType === 1 && (
						<div className="relative">
							<a
								href="#"
								className="text-gray-800 hover:text-teal-500"
								onMouseEnter={toggleUserDetailsDropdown}
								onMouseLeave={toggleUserDetailsDropdown}
							>
								User Details
							</a>
							{showUserDetailsDropdown && (
								<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										User Details
									</a>
									<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
										Saved Jobs
									</a>
								</div>
							)}
						</div>
					)}

					{currentUser?.userType === 1 ? (
						<div className="relative">
							<a href="#" className="text-gray-800 hover:text-teal-500">
								User Details
							</a>
							<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
								<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									User Details
								</a>
								<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									Saved Jobs
								</a>
							</div>
						</div>
					) : currentUser?.userType === 2 ? (
						<div className="relative">
							<a href="#" className="text-gray-800 hover:text-teal-500">
								Create
							</a>
							<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
								<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									Create Job
								</a>
								<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									Create Enterprise
								</a>
							</div>
						</div>
					) : null}

					{showCreateDropdown && (
						<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
							<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								Create Job
							</a>
							<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								Create Enterprise
							</a>
						</div>
					)}

					<div className="md:hidden">
						<button
							onClick={toggleMobileMenu}
							type="button"
							className="text-gray-800 focus:outline-none"
						>
							<svg
								className={`w-6 h-6 transition-transform transform ${
									isMobileMenuOpen ? 'rotate-180' : ''
								}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 6H3m18 6H3m18 6H3"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			{isMobileMenuOpen && (
				<div className="md:hidden bg-gray-100 absolute w-full">
					<div className="px-4 py-2 space-y-4">
						<a href="/" className="block text-gray-800 hover:text-teal-500">
							Home
						</a>
						<a href="/" className="block text-gray-800 hover:text-teal-500">
							About
						</a>
						<a href="/" className="block text-gray-800 hover:text-teal-500">
							Services
						</a>
						<a href="/" className="block text-gray-800 hover:text-teal-500">
							Pricing
						</a>
						<a href="/" className="block text-gray-800 hover:text-teal-500">
							Contact
						</a>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
