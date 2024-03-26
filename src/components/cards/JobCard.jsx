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

	const [showFullInfo, setShowFullInfo] = useState(false);

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

	const toggleShowFullInfo = () => {
		setShowFullInfo(!showFullInfo);
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
					<p className=" mt-5 ">{location ? location : 'ojbnjb'}</p>
				</div>

				<div className=" flex mt-1 ">
					<Lordicon
						src="https://cdn.lordicon.com/nqisoomz.json"
						trigger="hover"
						style={{ width: '50px', height: '50px' }}
					/>
					<p className=" mt-4 ml-2 ">{contactEmail}</p>
				</div>

				<div className=" flex mt-1 ">
					<Lordicon
						src="https://cdn.lordicon.com/lzlcrlfm.json"
						trigger="hover"
						style={{ width: '50px', height: '50px' }}
					/>
					<p className=" mt-4 ml-2 ">{contactCelphone}</p>
				</div>
				<p>
					<strong>About the job:</strong> {showFullInfo ? info : `${info.slice(0, 100)}...`}
					{!showFullInfo && (
						<button onClick={toggleShowFullInfo} className=" ml-3">
							<Lordicon
								src="https://cdn.lordicon.com/pdsourfn.json"
								trigger="hover"
								colors="primary:#000000,secondary:#e8e230,tertiary:#242424"
								style={{ width: '20px', height: '20px' }}
							/>
							More..
						</button>
					)}
				</p>
				<p className="mt-2">
					<strong>Requirements:</strong> {requirements}
				</p>

				{showLoginMessage && !userInfo && (
					<div className=" bg-red-700 rounded-md text-white mt-2">
						<h1 className=" ml-2"> You need to be logged in to perform this action.</h1>
					</div>
				)}

				<div className=" flex">
					<button
						onClick={handleSaveJob}
						className={`mt-4 ${
							isJobSaved ? 'border-green-500' : 'border'
						}  border w-1/2 text-white px-4 py-2 rounded-md `}
					>
						{isJobSaved ? (
							<Lordicon
								src="https://cdn.lordicon.com/ulnswmkk.json"
								trigger="hover"
								style={{ width: '35px', height: '30px' }}
								color="red"
							/>
						) : (
							<div className="  flex flex-col justify-center items-center">
								<Lordicon
									src="https://cdn.lordicon.com/ulnswmkk.json"
									trigger="hover"
									style={{ width: '35px', height: '30px' }}
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
							<div className=" text-black">You applied this job</div>
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
						className="mt-2 bg-red-700 hover:bg-green-800 text-white px-4 py-2 rounded-md"
					>
						Login
					</button>
				)}
			</div>
		</div>
	);
};

export default JobCard;
