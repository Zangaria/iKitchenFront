import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { MdPerson } from 'react-icons/md';
import { userLogout } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const { userInfo } = useSelector((state) => state.user);

	useEffect(() => {
		// Check if user authentication info exists in Redux state or local storage
		if (userInfo || localStorage.getItem('userInfo')) {
			// console.log(userInfo);
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, [userInfo]);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!isMobileMenuOpen);
	};

	const handleLogout = () => {
		dispatch(userLogout());
		navigate('/');
	};

	return (
		<nav className="bg-white sticky top-0">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between items-center py-1">
					<div className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
						<a
							href="/"
							className="px-2 py-1 bg-gradient-to-r from-teal-500 via-white to-pink-700 rounded-lg text-black"
						>
							i - work
						</a>
						Company
					</div>
					<div className="hidden md:flex space-x-4">
						{!isAuthenticated ? (
							<>
								<a href="register" className="text-gray-800 hover:text-teal-500">
									Register
								</a>
								<a href="login" className="text-gray-800 hover:text-teal-500">
									Login
								</a>
							</>
						) : userInfo?.type === 1 ? (
							<div className="relative bg-green-500 flex justify-center  rounded-lg w-8 h-8">
								<button
									onClick={toggleDropdown}
									className="text-gray-800 hover:text-teal-500 focus:outline-none"
								>
									{/* <MdPerson /> */}
								</button>
								{isOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
										<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
											User Details
										</a>

										<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
											Saved Jobs
										</a>
									</div>
								)}
								<button onClick={handleLogout}>Logout</button>
							</div>
						) : (
							userInfo?.type === 2 && (
								<div className="relative bg-green-500 flex justify-center  rounded-lg w-8 h-8">
									<button
										onClick={toggleDropdown}
										className="text-gray-800 hover:text-teal-500 focus:outline-none"
									>
										{/* <MdPerson className=" text-white" /> */}
									</button>
									{isOpen && (
										<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
											<a
												href="createEnterprise"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Create enterprise
											</a>
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
											<button onClick={handleLogout}>Logout</button>
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
