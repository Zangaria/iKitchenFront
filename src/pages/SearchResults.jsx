import React from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../components/cards/JobCard';

const SearchResults = () => {
	// Access the search results from the Redux state
	const searchResults = useSelector((state) => state.search.searchResults);

	return (
		<>
			<div className="text-black py-20 bg-white flex flex-col items-center justify-center">
				<div className=" w-5/6">
					{/* Map over the search results and render JobCard for each result */}
					{searchResults.map((result, index) => (
						<div key={index} className="">
							<JobCard
								key={index}
								jobid={result._id}
								title={result.title}
								requirements={result.requirements}
								location={result.location}
								contactCelphone={result.contactCelphone}
								contactEmail={result.contactEmail}
								contactName={result.contactName}
								info={result.info}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default SearchResults;
