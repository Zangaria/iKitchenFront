import React from 'react';
import CardsContainer from '../components/CardsContainer';
import SearchJob from '../components/SearchJob';

function Home() {
	return (
		<>
			<div className="text-center container mx-auto">
				<SearchJob></SearchJob>
				<CardsContainer></CardsContainer>
			</div>
		</>
	);
}

export default Home;
