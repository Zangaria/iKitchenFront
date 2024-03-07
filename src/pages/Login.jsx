import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		// Redirect to home page if user is authenticated
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const userLoginState = useSelector((state) => state.userLogin);
	const { loading, error, isAuthenticated } = userLoginState;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userData = {
			email: user.email,
			password: user.password,
		};
		dispatch(loginAction(userData));
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

					<button
						type="submit"
						className="w-full mt-4 text-white bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 hover:bg-teal-600 hover:ring-teal-400"
					>
						{loading ? 'Logging in...' : 'Go'}
					</button>
					{error && <div className="text-red-500 text-center mt-4">{error}</div>}
				</form>
			</div>
		</section>
	);
}
