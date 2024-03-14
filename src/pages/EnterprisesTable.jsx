import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEnterprises } from '../actions/userActions';

const EnterprisesTable = () => {
	const dispatch = useDispatch();
	const [enterprises, setEnterprises] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const getAllEnterprises = async () => {
			const enterprises = await dispatch(getEnterprises());
			setEnterprises(enterprises.allEnterprises);
		};
		getAllEnterprises();
	}, [dispatch]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredEnterprises = enterprises.filter((enterprise) =>
		enterprise.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container mx-auto mt-8">
			<div className="text-xl md:text-3xl font-bold leading-tight tracking-tight text-teal-500 dark:text-white mb-4 text-center">
				Enterprises Table
			</div>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Search by Enterprise name"
					className="text-xs md:text-base border border-gray-300 px-4 py-2 my-2 rounded-md w-full md:w-1/3"
					value={searchTerm}
					onChange={handleSearchChange}
				/>
			</div>
			<table className="w-full border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-200">
						<th
							className="border border-gray-300 px-4 py-2 text-xs md:text-base"
							style={{ width: '33.33%' }}
						>
							Enterprise name
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
								{enterprise?.userId}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EnterprisesTable;
