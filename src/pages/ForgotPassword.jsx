import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../actions/userActions';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');

	useEffect(() => {
		const user = localStorage.getItem('userInfo');
		console.log(user);
	}, []);

	const dispatch = useDispatch();

	const userForgotPasswordState = useSelector((state) => state.userForgotPassword);
	const { loading, data, error } = userForgotPasswordState;

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const isEmailValid = (email) => {
		// Basic email validation using a regular expression
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleGoButtonClick = async (e) => {
		e.preventDefault();
		dispatch(forgotPasswordAction(email));
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="w-5/6 md:w-8/12 lg:w-5/12 xl:w-5/12">
				<form className="w-full">
					<div className="text-4xl font-bold leading-tight tracking-tight text-teal-500 md:text-3xl dark:text-white mb-4 text-center">
						Enter Email
					</div>

					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={handleEmailChange}
						className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					<button
						type="button"
						onClick={handleGoButtonClick}
						disabled={email.trim() === '' || !isEmailValid(email)}
						className={`w-full text-white ${
							email.trim() === '' || !isEmailValid(email)
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-teal-500'
						} focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 ${
							email.trim() === '' || !isEmailValid(email)
								? 'hover:bg-gray-400'
								: 'hover:bg-teal-600 hover:ring-teal-400'
						} mb-4`}
					>
						Go
					</button>
					{data && <div className="text-green text-center mt-4">{data}</div>}
					{error && <div className="text-green text-center mt-4">{error}</div>}
				</form>
			</div>
		</div>
	);
}
