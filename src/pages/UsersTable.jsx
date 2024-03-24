import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getJobs, deleteJobAction } from '../actions/userActions';
import { MdEdit, MdDelete } from 'react-icons/md';

const JobsTable = () => {
	const dispatch = useDispatch();
	const [jobs, setJobs] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchBy, setSearchBy] = useState('title');
	const [selectedJob, setSelectedJob] = useState(null);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
	const [jobToDelete, setJobToDelete] = useState(null);

	const popupRef = useRef(null);
	const deleteConfirmationRef = useRef(null);

	const saveChanges = () => {
		// Logic to save changes to the selected job
		closePopup();
	};

	const openPopup = (job) => {
		setSelectedJob(job);
		setIsPopupOpen(true);
	};

	const closePopup = () => {
		setIsPopupOpen(false);
	};

	const handleInputChange = (key, value) => {
		setSelectedJob((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};

	const openDeleteConfirmation = (job) => {
		setJobToDelete(job);
		setIsDeleteConfirmationOpen(true);
	};

	const closeDeleteConfirmation = () => {
		setIsDeleteConfirmationOpen(false);
	};

	useEffect(() => {
		const getAllJobs = async () => {
			const jobsData = await dispatch(getJobs());
			console.log('jobsData', jobsData);
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

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (
				(!popupRef.current || !popupRef.current.contains(event.target)) &&
				(!deleteConfirmationRef.current || !deleteConfirmationRef.current.contains(event.target))
			) {
				setIsPopupOpen(false);
				setIsDeleteConfirmationOpen(false);
			}
		};

		const handleEscapeKey = (event) => {
			if (event.key === 'Escape') {
				setIsPopupOpen(false);
				setIsDeleteConfirmationOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, []);

	const handleEdit = (job) => {
		console.log(`Editing job: ${job.title}`);
	};

	const handleDelete = (job) => {
		openDeleteConfirmation(job);
	};

	const confirmDelete = async () => {
		await dispatch(deleteJobAction(jobToDelete._id));
		const updatedJobs = await dispatch(getJobs());
		setJobs(updatedJobs);
		closeDeleteConfirmation();
	};

	const cancelDelete = () => {
		closeDeleteConfirmation();
	};

	const filteredJobs = jobs.filter((job) => {
		if (searchBy === 'title') {
			return job.title.toLowerCase().includes(searchTerm.toLowerCase());
		} else if (searchBy === 'contact email') {
			return job.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
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
						<option value="contact email">Contact email</option>
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
							Contact email
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
					{filteredJobs.map((job, index) => (
						<tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
							<td className="border border-gray-300 px-4 py-2 text-xs md:text-base">
								<span>{job?.title}</span>
							</td>
							<td
								className="border
border-gray-300 px-4 py-2 text-xs md:text-base"
							>
								{job?.contactEmail}
							</td>
							<td className="border border-gray-300 px-4 py-2 text-xs md:text-base">
								<div className="flex justify-center">
									<MdEdit
										className="cursor-pointer text-blue-500 mr-2 md:text-lg"
										onClick={() => openPopup(job)}
									/>
									<MdDelete
										className="cursor-pointer text-red-500 md:text-lg"
										onClick={() => handleDelete(job)}
									/>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{isPopupOpen && selectedJob && (
				<div className="fixed px-4 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
					<div
						ref={popupRef}
						className="bg-white p-8 rounded shadow-md transition-transform duration-300 transform"
					>
						<h2 className="text-xl font-semibold mb-4">{selectedJob.title}</h2>
						<form style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
							{Object.entries(selectedJob).map(([key, value]) => (
								<div key={key} className="mb-4">
									<label htmlFor={key} className="block text-gray-700 font-bold mb-2">
										{key}
									</label>
									<input
										type="text"
										id={key}
										value={value}
										onChange={(e) => handleInputChange(key, e.target.value)}
										className="border border-gray-300 px-4 py-2 rounded-md w-full"
									/>
								</div>
							))}
						</form>
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
					className="fixed px-4 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
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
