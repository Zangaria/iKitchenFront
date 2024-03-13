import React from 'react';

const JobCard = ({ jobId, enterprise, title, location, info, tags, requirements, mContact }) => {
	return (
		<section className="h-screen flex items-center justify-center">
			<div className="w-5/6 md:w-8/12 lg:w-5/12 xl:w-5/12 flex flex-col items-center justify-center">
				<div className="border p-4 rounded-md w-full">
					<h2 className="text-xl font-semibold mb-2">{title}</h2>
					<p className="mb-2">
						<strong>Enterprise:</strong> {enterprise}
					</p>
					<p className="mb-2">
						<strong>Tags:</strong> {tags}
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
					<p className="mb-2">
						<strong>Main Contact:</strong> {mContact}
					</p>
				</div>
			</div>
		</section>
	);
};

export default JobCard;
