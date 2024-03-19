import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Assuming you have an action to fetch jobs
import { getJobs } from '../actions/userActions';

const JobsTable = () => {
	const dispatch = useDispatch();
	const [jobs, setJobs] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchBy, setSearchBy] = useState('title');

	useEffect(() => {
		const getAllJobs = async () => {
			const jobsData = await dispatch(getJobs());
			setJobs(jobsData);
		};
		getAllJobs();
	}, [dispatch]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleSearchByChange = (event) => {
		setSearchBy(event.target.value);
	};

	const filteredJobs = jobs.filter((job) => {
		if (searchBy === 'title') {
			return job.title.toLowerCase().includes(searchTerm.toLowerCase());
		} else if (searchBy === 'enterprise') {
			return job.enterprise.toLowerCase().includes(searchTerm.toLowerCase());
		}
		return true;
	});

	return (
		<div className="container mx-auto mt-8">
			<div className="text-xl md:text-3xl font-bold leading-tight tracking-tight text-teal-500 dark:text-white mb-4 text-center">
				Jobs Table
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
						<option value="title">Title</option>
						<option value="enterprise">Enterprise</option>
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
							Job Title
						</th>
						<th
							className="border border-gray-300 px-4 py-2 text-xs md:text-base"
							style={{ width: '50%' }}
						>
							Enterprise
						</th>
						{/* Add more table headers as needed */}
					</tr>
				</thead>
				<tbody>
					{filteredJobs.map((job, index) => (
						<tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
							<td className="border border-gray-300 px-4 py-2 underline text-xs md:text-base">
								<Link to={`/Job/${job?._id}`}>{job?.title}</Link>
							</td>
							<td className="border border-gray-300 px-4 py-2 text-xs md:text-base">
								{job?.enterprise}
							</td>
							{/* Add more table data cells as needed */}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default JobsTable;
