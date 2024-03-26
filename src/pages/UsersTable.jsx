import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit, MdLock, MdLockOpen } from 'react-icons/md';
import { getUsers, toggleUserLock, updateUserDetails } from '../actions/userActions';

const JobsTable = () => {
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchBy, setSearchBy] = useState('email');
	const [selectedUser, setSelectedUser] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isToggleConfirmationOpen, setIsToggleConfirmationOpen] = useState(false);
	const [userToToggle, setUserToToggle] = useState(null);
	const { loading, searchUsers } = useSelector((state) => state.admin);

	const excludedKeys = ['_id', 'enterprise', 'entPublic', 'applicants', 'userId', 'cDate', '__v'];

	const popupRef = useRef(null);
	const deleteConfirmationRef = useRef(null);

	const saveChanges = async () => {
		await dispatch(updateUserDetails(selectedUser));
		closePopup();
	};

	const openPopup = (user) => {
		setSelectedUser(user);
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	const handleInputChange = (key, value) => {
		setSelectedUser((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const openToggleConfirmation = (user) => {
		setUserToToggle(user);
		setIsToggleConfirmationOpen(true);
	};

	const closeToggleConfirmation = () => {
		setIsToggleConfirmationOpen(false);
	};

	useEffect(() => {
		dispatch(getUsers());
		setUsers(searchUsers);
	}, [dispatch, searchUsers]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchByChange = (event) => {
		setSearchBy(event.target.value);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				(!popupRef.current || !popupRef.current.contains(event.target)) &&
				(!deleteConfirmationRef.current || !deleteConfirmationRef.current.contains(event.target))
			) {
				setIsPopupOpen(false);
				setIsToggleConfirmationOpen(false);
			}
		};

		const handleEscapeKey = (event) => {
			if (event.key === 'Escape') {
				setIsPopupOpen(false);
				setIsToggleConfirmationOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, []);

	const handleToggle = (user, goal) => {
		openToggleConfirmation(user, goal);
	};

	const confirmToggle = async () => {
		await dispatch(toggleUserLock(userToToggle._id));
		closeToggleConfirmation();
	};

	const cancelToggle = () => {
		closeToggleConfirmation();
	};

	const filteredUsers = users.filter((user) => {
		if (searchBy === 'email') {
			return user.email.toLowerCase().includes(searchTerm.toLowerCase());
		} else if (searchBy === 'name') {
			return (
				user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) &&
				user.lastName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
			);
		}
		return true;
	});

	return (
		<div className="container mx-auto mt-8">
			<div className="text-xl md:text-3xl font-bold leading-tight tracking-tight text-teal-500 dark:text-white mb-4 text-center">
				Users Table
			</div>
			<div className="mb-4 flex flex-col md:flex-row justify-between">
				<div className="order-2 md:order-1">
					<input
						type="text"
						placeholder={`Search by ${searchBy}`}
						className="text-xs md:text-base border border-gray-300 px-4 py-2 my-2 rounded-md w-full"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
				</div>
				<div className="flex items-center gap-4 order-1 md:order-2">
					<div className="text-xs md:text-base">Search by:</div>
					<select
						value={searchBy}
						onChange={handleSearchByChange}
						className="text-xs md:text-base border border-gray-300 px-4 py-2 my-2 rounded-md"
					>
						<option value="email">Email</option>
						<option value="name">Name</option>
					</select>
				</div>
			</div>

			<table className="w-full border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-200">
						<th
							className="border border-gray-300 px-4 py-2 text-xs md:text-base"
							style={{ width: '50%' }}
						>
							Email
						</th>
						<th
							className="border border-gray-300 px-4 py-2 text-xs md:text-base"
							style={{ width: '50%' }}
						>
							Full Name
						</th>
						<th
							className="border border-gray-300 px-4 py-2 text-xs md:text-base"
							style={{ width: '15%' }}
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user, index) => (
						<tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
							<td className="border border-gray-300 px-4 py-2 text-xs md:text-base">
								<span>{user?.email}</span>
							</td>
							<td
								className="border
border-gray-300 px-4 py-2 text-xs md:text-base"
							>
								{user?.firstName} {user?.lastName}
							</td>
							<td className="border border-gray-300 px-4 py-2 text-xs md:text-base">
								<div className="flex justify-center">
									<MdEdit
										className="cursor-pointer text-blue-500 mr-2 md:text-lg"
										onClick={() => openPopup(user)}
									/>
									{user?.locked ? (
										<MdLockOpen
											className="cursor-pointer text-green-500 md:text-lg"
											onClick={() => handleToggle(user, 'unlocked')}
										/>
									) : (
										<MdLock
											className="cursor-pointer text-red-500 md:text-lg"
											onClick={() => handleToggle(user, 'locked')}
										/>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{isPopupOpen && selectedUser && (
				<div className="fixed z-50 px-4 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
					<div
						ref={popupRef}
						className="bg-white p-8 rounded shadow-md transition-transform duration-300 transform max-h-[80vh] overflow-y-auto"
					>
						<h2 className="text-xl font-semibold mb-4">
							{selectedUser.firtName} {selectedUser.lastName}
						</h2>
						<div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{Object.entries(selectedUser)
								.filter(([key]) => !excludedKeys.includes(key))
								.map(([key, value]) => (
									<div key={key} className="mb-4">
										<label htmlFor={key} className="block text-gray-700 font-bold mb-2">
											{key}
										</label>
										{key === 'active' ? (
											<select
												id={key}
												value={value ? 'true' : 'false'}
												onChange={(e) => handleInputChange(key, e.target.value === 'true')}
												className="border border-gray-300 px-4 py-2 rounded-md w-full"
											>
												<option value="true">True</option>
												<option value="false">False</option>
											</select>
										) : key === 'firstName' || key === 'lastName' ? (
											<textarea
												id={key}
												value={value}
												onChange={(e) => handleInputChange(key, e.target.value)}
												className="border border-gray-300 px-4 py-2 rounded-md w-full"
											/>
										) : (
											<input
												type="text"
												id={key}
												value={value}
												onChange={(e) => handleInputChange(key, e.target.value)}
												className="border border-gray-300 px-4 py-2 rounded-md w-full"
											/>
										)}
									</div>
								))}
						</div>
						<div className="mt-4 flex justify-center">
							<button
								className="bg-teal-500 text-white px-4 py-2 rounded mr-2 hover:bg-teal-600 transition-colors duration-300"
								onClick={saveChanges}
							>
								Save
							</button>
							<button
								className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
								onClick={closePopup}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

			{isDeleteConfirmationOpen && (
				<div
					ref={deleteConfirmationRef}
					className="fixed z-50 px-4 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
					onClick={closeDeleteConfirmation}
				>
					<div className="bg-white p-8 rounded shadow-md transition-transform duration-300 transform">
						<p className="text-center text-xl font-semibold mb-4">
							Are you sure you want to delete this job?
						</p>
						<div className="mt-4 flex justify-center">
							<button
								className="bg-teal-500 text-white px-4 py-2 rounded mr-2 hover:bg-teal-600 transition-colors duration-300"
								onClick={confirmDelete}
							>
								Yes
							</button>
							<button
								className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
								onClick={cancelDelete}
							>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default JobsTable;
