import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJobToFavorites, removeJobFromFavoritesAction } from '../../actions/jobsActions';
import { useNavigate } from 'react-router-dom';

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
	const userInfo = useSelector((state) => state.user.userInfo);
	const favoritesJobs = userInfo ? userInfo.favoritesJobs : [];
	const ReusmeArray = userInfo ? userInfo.Reusme : [];

	const isSubmited = ReusmeArray?.some((resume) => resume.jobid === jobid);
	const isJobSaved = favoritesJobs?.some((job) => job._id === jobid);

	useEffect(() => {
		// console.log(userInfo.favoritesJobs);
	});

	// Func to toggle save/unsave job
	const handleSaveJob = () => {
		if (isJobSaved) {
			dispatch(removeJobFromFavoritesAction(jobid));
		} else {
			dispatch(addJobToFavorites(jobid));
		}
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
						{isSubmited ? 'You submitted' : 'Submit '}
					</button>
				</div>
			</div>
		</section>
	);
};

export default JobCard;
