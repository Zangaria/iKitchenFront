import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../actions/userActions';
import { updateUserDetailsAtRedux } from '../reducers/userReducers';

const UserDetailsPage = () => {
	const user = useSelector((state) => state.user.userInfo);
	const dispatch = useDispatch();

	// State for form inputs
	const [formData, setFormData] = useState({
		firstName: user ? user.firstName || '' : '',
		lastName: user ? user.lastName || '' : '',
		city: user ? user.city || '' : '',
		contactPhone: user ? user.contactPhone || '' : '',
		contactCelphone: user ? user.contactCelphone || '' : '',
	});
	const [error, setError] = useState('');

	const { firstName, lastName, city, contactPhone, contactCelphone } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Dispatch the updateUserDetails action with the updated data
		dispatch(updateUserDetails(formData));
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
						<label htmlFor="contactPhone" className="block mb-2 font-semibold">
							Contact Telephone
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
							Contact Cellphone
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
