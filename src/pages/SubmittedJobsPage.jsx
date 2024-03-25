import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../components/cards/JobCard';

const SubmittedJobsPage = () => {
	// Access the submitted jobs from the Redux state
	const submittedJobs = useSelector((state) => state.user.userInfo.favoritesJobs);

	useEffect(() => {
		console.log(submittedJobs);
	});

	if (submittedJobs.length === 0) {
		return <h1>No submitted jobs yet.</h1>;
	}

	// Render the submitted jobs if they exist
	return (
		<div className="text-black py-20 bg-white flex flex-col items-center justify-center">
			<div className="w-4/5 max-w-xl">
				<h1 className="text-2xl font-semibold mb-4">Submitted Jobs</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{/* Map over the submitted jobs and render JobCard for each job */}
					{submittedJobs.map((job, index) => (
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

export default SubmittedJobsPage;
