import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { changePasswordAction } from '../actions/userActions';

export default function ChangePassword() {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		const user = localStorage.getItem('userInfo');
		console.log(user);
	}, []);

	const dispatch = useDispatch();
	const navigate = useNavigate(); // Initialize useNavigate

	const userChangePasswordState = useSelector((state) => state.userChangePassword);
	const { loading, error } = userChangePasswordState;

	const isPasswordValid = (password) => {
		// Implement your password validation logic if needed
		return password.length >= 1; // Just an example, you can customize this check
	};

	const handleCurrentPasswordChange = (e) => {
		setCurrentPassword(e.target.value);
	};

	const handleNewPasswordChange = (e) => {
		setNewPassword(e.target.value);
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleUpdateButtonClick = async (e) => {
		e.preventDefault();

		// Check if "token" is present in local storage
		const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

		if (token) {
			if (newPassword !== confirmPassword) {
				// Handle password mismatch
				console.error('New password and confirm password do not match');
				return;
			}

			// Dispatch the action to change the password
			dispatch(changePasswordAction(currentPassword, newPassword, token));
		} else {
			// Use useNavigate to navigate to the "/login" page
			navigate('/login');
		}
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="w-5/6 md:w-8/12 lg:w-5/12 xl:w-5/12">
				<form className="w-full">
					<div className="text-4xl font-bold leading-tight tracking-tight text-teal-500 md:text-3xl dark:text-white mb-4 text-center">
						Change Password
					</div>

					<input
						type="password"
						placeholder="Current Password"
						value={currentPassword}
						onChange={handleCurrentPasswordChange}
						className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					<input
						type="password"
						placeholder="New Password"
						value={newPassword}
						onChange={handleNewPasswordChange}
						className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						required
					/>

					<button
						type="button"
						onClick={handleUpdateButtonClick}
						className={`w-full text-white ${
							currentPassword.trim() === '' ||
							newPassword.trim() === '' ||
							confirmPassword.trim() === '' ||
							!isPasswordValid(newPassword) ||
							newPassword !== confirmPassword
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-teal-500'
						} focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 ${
							currentPassword.trim() === '' ||
							newPassword.trim() === '' ||
							confirmPassword.trim() === '' ||
							!isPasswordValid(newPassword) ||
							newPassword !== confirmPassword
								? 'hover:bg-gray-400'
								: 'hover:bg-teal-600 hover:ring-teal-400'
						} mb-4`}
					>
						Update Password
					</button>
				</form>
			</div>
		</div>
	);
}
