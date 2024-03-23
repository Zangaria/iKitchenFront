import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserJobsAction } from '../actions/userActions'; // Import the getUserJobsAction action creator
import JobBlock from './JobBlock';

const JobBlocks = () => {
	const dispatch = useDispatch();
	const [jobData, setJobData] = useState([]);
	const [selectedJob, setSelectedJob] = useState(null); // State to track the selected job for the popup

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

	const handleJobClick = (job) => {
		setSelectedJob(job); // Set the selected job when a job block is clicked
	};

	const handleClosePopup = () => {
		setSelectedJob(null); // Reset selected job when closing the popup
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
					<div className="absolute inset-0 bg-gray-800 opacity-50"></div>
					<div className="bg-white p-8 rounded-lg z-10 overflow-y-auto max-h-full">
						<h2 className="text-2xl font-bold mb-4">{selectedJob.title}</h2>
						{/* Mapping over each property of selectedJob */}
						{Object.entries(selectedJob).map(([key, value]) => (
							<div key={key} className="mb-2">
								<span className="font-semibold">{key}: </span>
								<span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
							</div>
						))}
						<button
							className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onClick={handleClosePopup}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default JobBlocks;
