import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../../actions/userActions';
import { toggleFavoriteJob } from '../../reducers/userReducers';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const JobCard = ({
	jobid,
	title,
	location,
	info,
	requirements,
	contactCelphone,
	contactEmail,
	contactName,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const favoritesJobs = useSelector((state) => state.user.userInfo.favoritesJobs);
	const isJobSaved = favoritesJobs?.includes(jobid);
	const ReusmeArray = useSelector((state) => state.user.userInfo.Reusme);
	const isSubmited = ReusmeArray.some((resume) => resume.jobid === jobid);
	const userInfo = useSelector((state) => state.user.userInfo);

	// Func to toggle save/unsave job
	const handleSaveJob = () => {
		dispatch(toggleFavoriteJob(jobid));
		dispatch(updateUserDetails());
	};

	const handleSubmitSv = () => {
		navigate(`/submit-cv/${jobid}`);
	};

	return (
		<section className="h-screen flex items-center justify-center">
			<div className="w-full flex flex-col items-center justify-center">
				<div className="border p-4 rounded-md w-full">
					<h2 className="text-xl font-semibold mb-2">{title}</h2>

					<p className="mb-2">
						<strong>Location:</strong> {location}
					</p>
					<p className="mb-2">
						<strong>Info:</strong> {info}
					</p>
					<p className="mb-2">
						<strong>Requirements:</strong> {requirements}
					</p>
					<p className="mb-2">
						<strong>Contact cellPhone:</strong> {contactCelphone}
					</p>
					<p className="mb-2">
						<strong>Contact email:</strong> {contactEmail}
					</p>
					<p className="mb-2">
						<strong>Contact name:</strong> {contactName}
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
						disabled={isSubmited}
					>
						{isSubmited ? 'You sbmited' : 'Submit '}
					</button>
				</div>
			</div>
		</section>
	);
};

export default JobCard;
