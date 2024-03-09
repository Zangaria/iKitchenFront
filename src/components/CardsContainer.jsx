import React from 'react';
import Cards from './Cards';
import CardsHeader from './CardsHeader';

const CardsContainer = () => {
  return (
    <div className="flex justify-between">
      <CardsHeader />
      <Cards />
    </div>
  );
};

export default CardsContainer;
