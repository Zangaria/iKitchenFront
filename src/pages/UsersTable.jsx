import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../actions/userActions';

const UsersTable = () => {
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchBy, setSearchBy] = useState('email');

	useEffect(() => {
		const getAllUsers = async () => {
			const usersData = await dispatch(getUsers());
			setUsers(usersData);
		};
		getAllUsers();
	}, [dispatch]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchByChange = (event) => {
		setSearchBy(event.target.value);
	};

	const filteredUsers = users.filter((user) => {
		if (searchBy === 'email') {
			return user.email.toLowerCase().includes(searchTerm.toLowerCase());
		} else if (searchBy === 'firstName') {
			return user.firstName.toLowerCase().includes(searchTerm.toLowerCase());
		} else if (searchBy === 'lastName') {
			return user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
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
						<option value="firstName">First Name</option>
						<option value="lastName">Last Name</option>
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
						{/* Add more table headers as needed */}
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user, index) => (
						<tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
							<td className="border border-gray-300 px-4 py-2 underline text-xs md:text-base">
								<Link to={`/User/${user?._id}`}>{user?.Email}</Link>
							</td>
							<td className="border border-gray-300 px-4 py-2 text-xs md:text-base">
								{user?.firstName} {user?.lastName}
							</td>
							{/* Add more table data cells as needed */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UsersTable;
