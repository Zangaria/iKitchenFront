import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEnterprises } from '../actions/userActions';

const EnterprisesTable = () => {
	const dispatch = useDispatch();
	const [enterprises, setEnterprises] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchBy, setSearchBy] = useState('enterprise name');

	useEffect(() => {
		const getAllEnterprises = async () => {
			const enterprises = await dispatch(getEnterprises());
			console.log('enterprises', enterprises);
			setEnterprises(enterprises.allEnterprises);
		};
		getAllEnterprises();
	}, [dispatch]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchByChange = (event) => {
		setSearchBy(event.target.value);
	};

	const filteredEnterprises = enterprises.filter((enterprise) => {
		if (searchBy === 'name') {
			return enterprise.name.toLowerCase().includes(searchTerm.toLowerCase());
		} else if (searchBy === 'email') {
			return enterprise.email.toLowerCase().includes(searchTerm.toLowerCase());
		} else if (searchBy === 'contact') {
			return enterprise.contact.toLowerCase().includes(searchTerm.toLowerCase());
		}
		return true;
	});

	return (
		<div className="container mx-auto mt-8">
			<div className="text-xl md:text-3xl font-bold leading-tight tracking-tight text-teal-500 dark:text-white mb-4 text-center">
				Enterprises Table
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
						<option value="name">Enterprise Name</option>
						<option value="email">Email</option>
						<option value="contact">Contact</option>
					</select>
				</div>
			</div>
			<table className="w-full border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-200">
						<th
							className="border border-gray-300 px-4 py-2 text-xs md:text-base"
							style={{ width: '33.33%' }}
						>
							Enterprise Name
						</th>
						<th
							className="border border-gray-300 px-4 py-2 text-xs md:text-base"
							style={{ width: '33.33%' }}
						>
							Email
						</th>
						<th
							className="hidden md:table-cell border border-gray-300 px-4 py-2 text-xs md:text-base"
							style={{ width: '33.33%' }} // Hide in mobile view
						>
							Contact
						</th>
					</tr>
				</thead>
				<tbody>
					{filteredEnterprises.map((enterprise, index) => (
						<tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
							<td className="border border-gray-300 px-4 py-2 underline text-xs md:text-base">
								<Link to={`/Enterprise/${enterprise?._id}`}>{enterprise?.name}</Link>
							</td>
							<td className="border border-gray-300 px-4 py-2 text-xs md:text-base">
								{enterprise?.logo}
							</td>
							<td className="hidden md:table-cell border border-gray-300 px-4 py-2 text-xs md:text-base">
								{enterprise?.logo}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EnterprisesTable;
