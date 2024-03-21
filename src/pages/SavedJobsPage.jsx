import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../components/cards/JobCard';

const SavedJobsPage = () => {
	// Access the saved jobs from the Redux state
	const savedJobs = useSelector((state) => state.user.userInfo.favoritesJobs);
	useEffect(() => {
		console.log(savedJobs);
	});

	if (savedJobs.length === 0) {
		return <h1>"ojnojnoj</h1>;
	}

	if (savedJobs != undefined)
		return (
			<div className="text-black py-20 bg-white flex flex-col items-center justify-center">
				<div className="w-4/5 max-w-xl">
					<h1 className="text-2xl font-semibold mb-4">Saved Jobs</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{/* Map over the saved jobs and render JobCard for each saved job */}
						{savedJobs.map((job, index) => (
							<JobCard
								key={index}
								jobId={job._id}
								title={job.title}
								enterprise={job.enterprise}
								location={job.location}
								info={job.info}
								tags={job.tags}
								requirements={job.requirements}
								mContact={job.mContact}
							/>
						))}
					</div>
				</div>
			</div>
		);
};

export default SavedJobsPage;
