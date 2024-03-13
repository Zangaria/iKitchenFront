import React from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../components/cards/JobCard';
import SearchJob from '../components/SearchJob';
import { Link } from 'react-router-dom';
const SearchResults = () => {
	// Access the search results from the Redux state
	const searchResults = useSelector((state) => state.search.searchResults);

	return (
		<>
			<div className="text-black py-20 bg-white flex flex-col items-center justify-center">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{/* Map over the search results and render JobCard for each result */}
					{searchResults.map((result, index) => (
						<JobCard
							key={index}
							jobId={result._id}
							title={result.title}
							enterprise={result.enterprise}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default SearchResults;
