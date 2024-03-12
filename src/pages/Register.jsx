import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../actions/userActions';
import { ClipLoader } from 'react-spinners';

export default function Register() {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: 0,
		jobType: '',
		location: '',
	});
	const [passwordsMatchError, setPasswordsMatchError] = useState('');
	const dispatch = useDispatch();

	const userRegisterState = useSelector((state) => state.user);
	const { loading, error, data } = userRegisterState;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};

	const handleSubmit = async (e) => {
		console.log('submit');
		e.preventDefault();

		// Validate the form
		if (user.password !== user.confirmPassword) {
			setPasswordsMatchError('Passwords do not match');
			return;
		}

		// Clear previous error if passwords match
		setPasswordsMatchError('');

		// Prepare the data object
		const userData = {
			email: user.email,
			password: user.password,
			userName: user.firstName,
			lastName: user.lastName,
			type: user.role,
			jobType: user.jobType,
			location: user.location,
		};

		dispatch(registerAction(userData));
	};

	return (
		<section className="h-screen flex items-center justify-center">
			<div className="w-5/6 md:w-8/12 lg:w-5/12 xl:w-5/12 flex flex-col items-center justify-center">
				<form onSubmit={handleSubmit} className="w-full">
					<div className="text-4xl font-bold leading-tight tracking-tight text-teal-500 md:text-3xl dark:text-white mb-4 text-center">
						Register
					</div>

					{/* firstName input */}
					<input
						type="text"
						placeholder="firstName"
						name="firstName"
						value={user.firstName}
						onChange={handleChange}
						className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					{/* Name input */}
					<input
						type="text"
						placeholder="lastName"
						name="lastName"
						value={user.lastName}
						onChange={handleChange}
						className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
					/>

					{/* Email input */}
					<input
						type="email"
						placeholder="Email"
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
						className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					{/* Confirm Password input */}
					<input
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						value={user.confirmPassword}
						onChange={handleChange}
						className="w-full py-2 px-4 mb-2 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					{/* Radio buttons for choosing role */}
					<div className="flex items-center mb-6">
						<button
							type="button"
							className={`mr-2 py-1 px-3 rounded-lg focus:outline-none ${
								user.role === 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'
							}`}
							onClick={() => setUser((prevState) => ({ ...prevState, role: 1 }))}
						>
							I am a job finder
						</button>
						<button
							type="button"
							className={`py-1 px-3 rounded-lg focus:outline-none ${
								user.role === 2 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'
							}`}
							onClick={() => setUser((prevState) => ({ ...prevState, role: 2 }))}
						>
							I am an employee
						</button>
					</div>

					{/* Additional inputs for jobFinder */}
					{user.role === 1 && (
						<>
							<div className="mb-6">
								<label htmlFor="jobType">Select Job Type:</label>
								<select
									id="jobType"
									name="jobType"
									value={user.jobType}
									onChange={handleChange}
									className="w-full py-2 px-4 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
								>
									<option value="">Select Job Type</option>
									<option value="computers">Computers</option>
									<option value="teacher">Teacher</option>
								</select>
							</div>
							<input
								type="text"
								placeholder="Location"
								name="location"
								value={user.location}
								onChange={handleChange}
								className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
								required
							/>
						</>
					)}

					{/* Error message for password mismatch */}
					{passwordsMatchError && (
						<p className="text-red-500 text-sm mb-4">{passwordsMatchError}</p>
					)}

					<button
						type="submit"
						className="w-full mt-4 text-white bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 hover:bg-teal-600 hover:ring-teal-400"
						disabled={loading} // Disable the button when loading
					>
						{loading ? <ClipLoader color="#ffffff" loading={loading} size={20} /> : 'Go'}
					</button>
					{error && (
						<div className="bg-red-500 text-white text-center rounded-md p-2 mb-4 mt-4">
							{error}
						</div>
					)}
					{data && (
						<div
							className="bg-green-500 text-white
						 rounded-md text-center mt-4"
						>
							{data}
						</div>
					)}
					{/* Link to login page */}
					<div className="w-full mt-4 flex flex-col items-center justify-center">
						{/* Text and link in the middle */}
						<p className="text-sm mt-2">
							Have already an account?{' '}
							<Link
								className="inline-block px-6 py-2 text-sm font-medium leading-5 text-teal-500 bg-teal-100 rounded-full focus:outline-none focus:shadow-outline-teal hover:bg-teal-200"
								to="/login"
							>
								Login here
							</Link>
						</p>

						{/* Other form elements */}
					</div>
				</form>
			</div>
		</section>
	);
}
