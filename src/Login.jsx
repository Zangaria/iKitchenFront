import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const [loginError, setLoginError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Prepare the data object
		const data = {
			email: user.email,
			password: user.password,
		};

		try {
			// Make a POST request to the server for login
			const response = await axios.post('https://api-ikitchen.amio.co.il/login', data);

			// Handle the response (you might want to check response status and handle accordingly)
			console.log('Login successful:', response.data);
		} catch (error) {
			// Handle errors (log, display an error message, etc.)
			console.error('Login failed:', error.message);
			setLoginError('Invalid email or password. Please try again.'); // Set an error message
		}
	};

	return (
		<section className="h-screen flex items-center justify-center">
			<div className="w-5/6 md:w-8/12 lg:w-5/12 xl:w-5/12 flex flex-col items-center justify-center">
				<form onSubmit={handleSubmit} className="w-full">
					<div className="text-4xl font-bold leading-tight tracking-tight text-teal-500 md:text-3xl dark:text-white mb-4 text-center">
						Login
					</div>

					{/* Email input */}
					<input
						type="email"
						placeholder="Email address"
						name="email"
						value={user.email}
						onChange={handleChange}
						className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					{/* Password input */}
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={user.password}
						onChange={handleChange}
						className="w-full py-2 px-4 mb-2 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					{/* Error message for login failure */}
					{loginError && <p className="text-red-500 text-sm mb-4">{loginError}</p>}

					<button
						type="submit"
						className="w-full mt-4 text-white bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 hover:bg-teal-600 hover:ring-teal-400"
					>
						Go
					</button>
				</form>
			</div>
		</section>
	);
}
