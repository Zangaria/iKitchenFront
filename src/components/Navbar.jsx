import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdPerson } from 'react-icons/md';
import { userLogout } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import WebsiteLogo from '../images/iworklogo.png';

const Navbar = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	const dropdownRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const { userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		// Check initial authentication status
		const checkAuthentication = () => {
			if (userInfo || localStorage.getItem('userInfo')) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		};

		checkAuthentication();
	}, [userInfo]);

	useEffect(() => {
		// Add event listener to close dropdown when clicking outside
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!isMobileMenuOpen);
	};

	const handleLogout = () => {
		dispatch(userLogout());
		navigate('/');
	};

	return (
		<nav className="bg-white sticky top-0 z-20 py-1 shadow-md">
			<div className="max-w-7xl max-h-20 mx-auto px-4">
				<div className="flex justify-between items-center py-1">
					<div className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
						<a
							href="/"
							className=" bg-gradient-to-r from-teal-500 via-white to-pink-700 rounded-lg text-black"
						>
							<img src={WebsiteLogo} className=" w-24 h-24" alt="Website Logo" />
						</a>
					</div>
					<div className="hidden md:flex space-x-4">
						{!isAuthenticated ? (
							<>
								<a
									href="register"
									className="text-gray-800  font-semibold hover:text-teal-600 transition-colors duration-300"
								>
									Register
								</a>
								<a
									href="login"
									className="text-gray-800  font-semibold hover:text-teal-600 transition-colors duration-300"
								>
									Login
								</a>
							</>
						) : userInfo?.type === 1 ? (
							<div
								ref={dropdownRef}
								className="relative bg-teal-500 flex justify-center rounded-lg w-8 h-8"
							>
								<button
									onClick={toggleDropdown}
									className="text-gray-800 hover:text-teal-500 focus:outline-none"
								>
									<MdPerson className="text-white hover:text-black transition-colors duration-300" />
								</button>
								{isOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg top-8">
										<a
											href="user-details"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											User Details
										</a>
										<a
											href="saved-jobs"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Saved Jobs
										</a>
										<a
											href="submitted-jobs"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Jobs Applied
										</a>
										<button
											className="w-full text-left block px-4 py-2 text-sm text-gray-800 font-bold hover:text-teal-600 transition-colors duration-300"
											onClick={handleLogout}
										>
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							userInfo?.type === 2 && (
								<div
									ref={dropdownRef}
									className="relative bg-teal-500 flex justify-center rounded-lg w-8 h-8"
								>
									<button
										onClick={toggleDropdown}
										className="text-gray-800 hover:text-teal-500 focus:outline-none"
									>
										<MdPerson className="text-white hover:text-black transition-colors duration-300" />
									</button>
									{isOpen && (
										<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg top-8">
											<a
												href="createJob"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Create job
											</a>
											<a
												href="user-details"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												User Details
											</a>
											<a
												href="my-jobs"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												My posted Jobs
											</a>
											<button
												className="w-full text-left block px-4 py-2 text-sm text-gray-800 font-bold hover:text-teal-600 transition-colors duration-300"
												onClick={handleLogout}
											>
												Logout
											</button>
										</div>
									)}
								</div>
							)
						)}
					</div>

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
					{!isAuthenticated ? (
						<>
							<a
								href="register"
								className="text-gray-800 font-semibold hover:text-teal-600 transition-colors duration-300"
							>
								Register
							</a>
							<a
								href="login"
								className="text-gray-800 font-semibold hover:text-teal-600 transition-colors duration-300"
							>
								Login
							</a>
						</>
					) : userInfo?.type === 1 ? (
						<>
							<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								User Details
							</a>
							<a
								href="saved-jobs"
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								Saved Jobs
							</a>
							<a
								href="submitted-jobs"
								className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								Jobs Applied
							</a>
							<button
								className="w-full text-left block px-4 py-2 text-sm text-gray-800 font-bold hover:text-teal-600 transition-colors duration-300"
								onClick={handleLogout}
							>
								Logout
							</button>
						</>
					) : (
						userInfo?.type === 2 && (
							<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
								Create job
							</a>
						)
					)}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
