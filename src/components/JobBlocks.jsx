import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getUserJobsAction, updateJobAction } from '../actions/userActions'; // Import the getUserJobsAction and updateJobAction action creators
import JobBlock from './JobBlock';

const JobBlocks = () => {
	const dispatch = useDispatch();
	const [jobData, setJobData] = useState([]);
	const [selectedJob, setSelectedJob] = useState(null); // State to track the selected job for the popup
	const [editedJob, setEditedJob] = useState(null); // State to store edited job data
	const popupRef = useRef(null); // Ref to the popup container

	const excludedKeys = ['_id', 'userId', 'cDate', '__v'];

	useEffect(() => {
		const getAllJobs = async () => {
			try {
				const jobsData = await dispatch(getUserJobsAction());
				setJobData(jobsData);
			} catch (error) {
				console.error('Error fetching job data:', error);
			}
		};
		getAllJobs();
	}, [dispatch]);

	useEffect(() => {
		// Add event listeners when the component mounts
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscKeyPress);

		// Remove event listeners when the component unmounts
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscKeyPress);
		};
	}, []);

	const handleClickOutside = (e) => {
		if (popupRef.current && !popupRef.current.contains(e.target)) {
			handleClosePopup();
		}
	};

	const handleEscKeyPress = (e) => {
		if (e.key === 'Escape') {
			handleClosePopup();
		}
	};

	const handleJobClick = (job) => {
		setSelectedJob(job); // Set the selected job when a job block is clicked
		setEditedJob({ ...job }); // Set the edited job data to the selected job
	};

	const handleClosePopup = () => {
		setSelectedJob(null); // Reset selected job when closing the popup
		setEditedJob(null); // Reset edited job data when closing the popup
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedJob((prevJob) => ({
			...prevJob,
			[name]: value,
		}));
	};

	const handleSave = async () => {
		try {
			await dispatch(updateJobAction(editedJob)); // Dispatch updateJobAction with the edited job data
			const updatedJobs = await dispatch(getUserJobsAction()); // Fetch updated job data
			setJobData(updatedJobs); // Update job data in the component state
			setSelectedJob(null); // Reset selected job
			setEditedJob(null); // Reset edited job data
		} catch (error) {
			console.error('Error updating job:', error);
		}
	};

	return (
		<div>
			<div className="text-4xl font-bold leading-tight tracking-tight text-teal-500 md:text-3xl dark:text-white mb-8 text-center">
				My Jobs
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{jobData.map((job) => (
					<JobBlock
						key={job._id}
						title={job.title}
						info={job.info}
						buttonText="View details"
						onClick={() => handleJobClick(job)} // Pass handleJobClick as onClick prop
					/>
				))}
			</div>
			{selectedJob && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div ref={popupRef} className="bg-gray-800 bg-opacity-50 absolute inset-0" />
					<div className="bg-white p-8 rounded-lg z-10 overflow-y-auto max-h-full">
						<h2 className="text-xl font-semibold mb-4">{selectedJob.title}</h2>
						<div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{editedJob &&
								Object.entries(editedJob)
									.filter(([key]) => !excludedKeys.includes(key))
									.map(([key, value]) => (
										<div key={key} className="mb-4 text-left">
											<label className="block text-gray-700 font-bold">{key} </label>
											{key === 'info' || key === 'requirements' ? (
												<textarea
													name={key}
													value={value}
													onChange={handleChange}
													className="border border-gray-300 px-4 py-2 rounded-md w-full resize-none mt-2"
													rows={5} // Set the number of rows for textarea
												/>
											) : (
												<input
													type="text"
													name={key}
													value={value}
													onChange={handleChange}
													className="border border-gray-300 px-4 py-2 rounded-md w-full mt-2"
												/>
											)}
										</div>
									))}
						</div>
						<div className="mt-4 flex justify-center">
							<button
								className="bg-teal-500 text-white px-4 py-2 rounded mr-2 hover:bg-teal-600 transition-colors duration-300"
								onClick={handleSave}
							>
								Save
							</button>
							<button
								className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline"
								onClick={handleClosePopup}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default JobBlocks;
