import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-teal-500 text-white py-8 absolute bottom-0 w-full flex items-center h-40">
			<div className="container mx-auto text-center">
				<p className="text-sm">© 2024 iWork. All rights reserved.</p>
				<div className="mt-4 flex flex-col md:flex-row justify-center">
					<a href="#" className="mx-2 transition-colors duration-300 hover:text-black">
						Terms of Service
					</a>
					<span className="text-white hidden md:block">|</span>
					<a href="#" className="mx-2 transition-colors duration-300 hover:text-black">
						Privacy Policy
					</a>
					<span className="text-white hidden md:block">|</span>
					<a href="#" className="mx-2 transition-colors duration-300 hover:text-black">
						Contact Us
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
