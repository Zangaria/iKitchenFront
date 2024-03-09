import React from 'react';
import CardsContainer from '../components/CardsContainer';
import Search from '../components/Search';

function Home() {
	return (
		<>
			<div className="text-center container mx-auto">
				<Search></Search>
				<CardsContainer></CardsContainer>
			</div>
		</>
	);
}

export default Home;
