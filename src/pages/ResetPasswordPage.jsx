import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordPage = () => {
	const [token, setToken] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const tokenParam = queryParams.get('token');
		setToken(tokenParam);
	}, [location.search]);

	const handleResetPassword = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess(false);

		if (newPassword !== confirmPassword) {
			setError('Passwords do not match.');
			return;
		}

		try {
			// Send a request to your backend API to reset the password
			await axios.post('https://your-backend-api.com/reset-password', {
				token,
				newPassword,
			});
			setSuccess(true);
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	if (success) {
		return <div>Password reset successfully. You can now login with your new password.</div>;
	}

	return (
		<div>
			<h2>Reset Password</h2>
			<form onSubmit={handleResetPassword}>
				<div>
					<label>New Password:</label>
					<input
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Confirm Password:</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Reset Password</button>
			</form>
			{error && <div>{error}</div>}
		</div>
	);
};

export default ResetPasswordPage;
