import React, { useState } from 'react';
import websiteLogo from '../images/website-logo.png';

const Navbar = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<nav className="bg-white sticky top-0">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between items-center py-1">
					<div className="flex items-center">
						<a href="https://flowbite.com/" className="flex items-center space-x-3">
							<img src={websiteLogo} className="h-16" alt="Flowbite Logo" />
						</a>
					</div>
					<div className="hidden md:flex space-x-4">
						<a href="#" className="text-gray-800 hover:text-teal-500">
							Home
						</a>
						<a href="#" className="text-gray-800 hover:text-teal-500">
							About
						</a>
						<a href="#" className="text-gray-800 hover:text-teal-500">
							Services
						</a>
						<a href="#" className="text-gray-800 hover:text-teal-500">
							Pricing
						</a>
						<a href="#" className="text-gray-800 hover:text-teal-500">
							Contact
						</a>
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
						<a href="#" className="block text-gray-800 hover:text-teal-500">
							Home
						</a>
						<a href="#" className="block text-gray-800 hover:text-teal-500">
							About
						</a>
						<a href="#" className="block text-gray-800 hover:text-teal-500">
							Services
						</a>
						<a href="#" className="block text-gray-800 hover:text-teal-500">
							Pricing
						</a>
						<a href="#" className="block text-gray-800 hover:text-teal-500">
							Contact
						</a>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
