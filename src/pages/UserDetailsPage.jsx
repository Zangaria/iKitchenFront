import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../actions/userActions';

const UserDetailsPage = () => {
	const user = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();

	// State for form inputs
	const [formData, setFormData] = useState({
		firstName: user ? user.firstName || '' : '',
		lastName: user ? user.lastName || '' : '',
		city: user ? user.city || '' : '',
		contactName: user ? user.contactName || '' : '',
		contactEmail: user ? user.contactEmail || '' : '',
		contactPhone: user ? user.contactPhone || '' : '',
		contactCelphone: user ? user.contactCelphone || '' : '',
	});
	const [error, setError] = useState('');

	const { firstName, lastName, city, contactName, contactEmail, contactPhone, contactCelphone } =
		formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		console.log(user);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Simple validation
		if (
			!firstName ||
			!lastName ||
			!city ||
			!contactName ||
			!contactEmail ||
			!contactPhone ||
			!contactCelphone
		) {
			setError('All fields are required');
			return;
		}

		// Dispatch the updateUserDetails action with the formData
		dispatch(updateUserDetails());
	};

	return (
		<div className="text-black py-20 bg-white flex flex-col items-center justify-center">
			<div className="w-4/5 max-w-xl">
				<form onSubmit={handleSubmit}>
					{error && <div className="text-red-500 mb-4">{error}</div>}
					<div className="mb-4">
						<label htmlFor="firstName" className="block mb-2 font-semibold">
							First Name
						</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={firstName}
							onChange={handleChange}
							className="border p-2 rounded w-full"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="lastName" className="block mb-2 font-semibold">
							Last Name
						</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={lastName}
							onChange={handleChange}
							className="border p-2 rounded w-full"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="city" className="block mb-2 font-semibold">
							City
						</label>
						<input
							type="text"
							id="city"
							name="city"
							value={city}
							onChange={handleChange}
							className="border p-2 rounded w-full"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="contactName" className="block mb-2 font-semibold">
							Contact Name
						</label>
						<input
							type="text"
							id="contactName"
							name="contactName"
							value={contactName}
							onChange={handleChange}
							className="border p-2 rounded w-full"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="contactEmail" className="block mb-2 font-semibold">
							Contact Email
						</label>
						<input
							type="email"
							id="contactEmail"
							name="contactEmail"
							value={contactEmail}
							onChange={handleChange}
							className="border p-2 rounded w-full"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="contactPhone" className="block mb-2 font-semibold">
							Contact Phone
						</label>
						<input
							type="tel"
							id="contactPhone"
							name="contactPhone"
							value={contactPhone}
							onChange={handleChange}
							className="border p-2 rounded w-full"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="contactCelphone" className="block mb-2 font-semibold">
							Contact Celphone
						</label>
						<input
							type="tel"
							id="contactCelphone"
							name="contactCelphone"
							value={contactCelphone}
							onChange={handleChange}
							className="border p-2 rounded w-full"
						/>
					</div>
					<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
						Save Changes
					</button>
				</form>
			</div>
		</div>
	);
};

export default UserDetailsPage;
