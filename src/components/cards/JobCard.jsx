import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../../actions/userActions';

const JobCard = ({ jobId, enterprise, title, location, info, tags, requirements, mContact }) => {
	const dispatch = useDispatch();
	const savedJobs = useSelector((state) => state.user.savedJobs);
	const isJobSaved = savedJobs?.includes(jobId);

	// Func to toggle save/unsave job
	const handleSaveJob = () => {
		if (isJobSaved) {
			dispatch(updateUserDetails());
		} else {
			// If job is not saved, save it
		}
	};

	// Func to send cv to this job
	const handleSubmitSv = () => {
		console.log('cv submitted!');
	};

	return (
		<section className="h-screen flex items-center justify-center">
			<div className="w-full flex flex-col items-center justify-center">
				<div className="border p-4 rounded-md w-full">
					<h2 className="text-xl font-semibold mb-2">{title}</h2>
					<p className="mb-2">
						<strong>Enterprise:</strong> {enterprise}
					</p>
					<p className="mb-2">
						<strong>Location:</strong> {location}
					</p>
					<p className="mb-2">
						<strong>Info:</strong> {info}
					</p>
					<p className="mb-2">
						<strong>Requirements:</strong> {requirements}
					</p>
					{/* Buttons */}
					<button
						onClick={handleSaveJob}
						className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
					>
						{isJobSaved ? 'Unsave Job' : 'Save Job'}
					</button>
					<button
						onClick={handleSubmitSv}
						className="mt-4 ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
					>
						Submit cv
					</button>
				</div>
			</div>
		</section>
	);
};

export default JobCard;
