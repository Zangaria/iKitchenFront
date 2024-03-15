import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../actions/userActions';

const UserDetailsPage = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	// State for form inputs
	const [firstName, setFirstName] = useState(user.firstName || '');
	const [lastName, setLastName] = useState(user.lastName || '');
	const [homeTown, setHomeTown] = useState(user.homeTown || '');
	const [contact, setContact] = useState(user.contact || '');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Construct the updated user data based on the changed fields
		const updatedUserData = {};

		// Check if each field has changed and add it to the updatedUserData object
		if (firstName !== user.firstName) {
			updatedUserData.firstName = firstName;
		}
		if (lastName !== user.lastName) {
			updatedUserData.lastName = lastName;
		}
		if (homeTown !== user.homeTown) {
			updatedUserData.homeTown = homeTown;
		}
		if (contact !== user.contact) {
			updatedUserData.contact = contact;
		}

		// Dispatch the updateUserDetails action with the updatedUserData
		dispatch(updateUserDetails(updatedUserData));
	};

	return (
		<div className="text-black py-20 bg-white flex flex-col items-center justify-center">
			<div className="w-4/5 max-w-xl">
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="firstName" className="block mb-2 font-semibold">
							First Name
						</label>
						<input
							type="text"
							id="firstName"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
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
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							className="border p-2 rounded w-full"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="homeTown" className="block mb-2 font-semibold">
							Home Town
						</label>
						<input
							type="text"
							id="homeTown"
							value={homeTown}
							onChange={(e) => setHomeTown(e.target.value)}
							className="border p-2 rounded w-full"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="contact" className="block mb-2 font-semibold">
							Contact
						</label>
						<input
							type="text"
							id="contact"
							value={contact}
							onChange={(e) => setContact(e.target.value)}
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
