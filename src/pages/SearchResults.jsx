import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobsByText } from '../actions/searchActions';
import JobCard from '../components/cards/JobCard';

const SearchResults = () => {
	// Access the search results from the Redux state
	const searchResults = useSelector((state) => state.search.searchResults);
	const dispatch = useDispatch();
	useEffect(() => {
		// Retrieve search parameters from local storage
		const storedSearchParams = localStorage.getItem('searchParams');
		if (storedSearchParams) {
			const { searchText } = JSON.parse(storedSearchParams);
			dispatch(fetchJobsByText({ title: searchText, from: 1, to: 20 }));
		}
	}, []);

	return (
		<>
			<div className="text-black py-20 bg-white flex flex-col items-center justify-center">
				<div className="w-5/6 grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Map over the search results and render JobCard for each result */}
					{searchResults.map((result, index) => (
						<div key={index}>
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
