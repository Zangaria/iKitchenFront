import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addJobOrRemoveFavorites } from '../../actions/jobsActions';
import { useNavigate } from 'react-router-dom';

import Lordicon from '../icons/Lordicon';
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

	// State to track if the user is trying to save or submit without being logged in
	const [showLoginMessage, setShowLoginMessage] = useState(false);

	const handleSaveJob = () => {
		if (!userInfo) {
			setShowLoginMessage(true);
		} else {
			dispatch(addJobOrRemoveFavorites(jobid));
		}
	};

	const handleSubmitSv = () => {
		if (!userInfo) {
			setShowLoginMessage(true);
		} else {
			navigate(`/submit-cv/${jobid}`);
		}
	};

	return (
		<div className="bg-white border mt-5 border-gray-200 rounded-lg shadow-md p-4 max-w-md w-full mx-auto">
			<div className=" rounded-md w-full">
				<h2 className="text-xl font-semibold ">{title}</h2>

				<div className=" flex mt-2 ">
					<Lordicon
						src="https://cdn.lordicon.com/tdtlrbly.json"
						trigger="hover"
						stroke="bold"
						style={{ width: '50px', height: '50px' }}
					/>
					<p className=" mt-6 ">{location}</p>
				</div>

				<div className=" flex mt-1 ">
					<Lordicon
						src="https://cdn.lordicon.com/nqisoomz.json"
						trigger="hover"
						style={{ width: '50px', height: '50px' }}
					/>
					<p className=" mt-4 ml-2 ">{contactEmail}</p>
				</div>

				<p className="mb-2">
					<strong>Info:</strong> {info}
				</p>
				<p className="mb-2">
					<strong>Requirements:</strong> {requirements}
				</p>
				<p className="mb-2">
					<strong>Contact cellPhone:</strong> {contactCelphone}
				</p>

				{showLoginMessage && !userInfo && <p>You need to be logged in to perform this action.</p>}

				<div className=" flex">
					<button
						onClick={handleSaveJob}
						className="mt-4  border w-1/2 text-white px-4 py-2 rounded-md"
					>
						{isJobSaved ? (
							<Lordicon
								src="https://cdn.lordicon.com/ulnswmkk.json"
								trigger="hover"
								style={{ width: '25px', height: '30px' }}
								color="red"
							/>
						) : (
							<div className="  flex flex-col justify-center items-center">
								<Lordicon
									src="https://cdn.lordicon.com/ulnswmkk.json"
									trigger="hover"
									style={{ width: '25px', height: '30px' }}
									color="red"
								/>
							</div>
						)}
					</button>
					<button
						onClick={handleSubmitSv}
						className="mt-4 ml-2 border text-white px-4 py-2 w-1/2 rounded-md"
						disabled={isSubmited}
					>
						{isSubmited ? (
							'You submitted'
						) : (
							<Lordicon
								src="https://cdn.lordicon.com/ujxzdfjx.json"
								trigger="hover"
								style={{ width: '25px', height: '30px' }}
							/>
						)}
					</button>
				</div>

				{/* Login button if not logged in */}
				{showLoginMessage && !userInfo && (
					<button
						onClick={() => navigate('/login')}
						className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
					>
						Login
					</button>
				)}
			</div>
		</div>
	);
};

export default JobCard;
