import React from 'react';
import Card from './Card';
import interview from '../images/interview.png';
import salaryCalculator from '../images/salary-calculator.png';
import escrot from '../images/escrot.png';
import salaryCompound from '../images/salary-compound.png';
import upgradeCv from '../images/upgrade-cv.png';
import alljobsTax from '../images/alljobs-tax.svg';

const Cards = () => {
	return (
		<div className="flex flex-wrap w-full md:w-3/4 justify-center">
			<div className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
				<Card
					link="/User/UpgradeCV/"
					imageSrc={upgradeCv}
					imageAlt="Uploading a resume"
					imageWidth="87"
					imageHeight="86"
					content="Uploading a resume"
					hoverClass="hover:scale-105 hover:shadow-lg"
				/>
			</div>

			<div className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
				<Card
					link="/User/SalaryCompound"
					imageSrc={salaryCompound}
					imageAlt="How much are you worth?"
					imageWidth="85"
					imageHeight="89"
					content="How much are you worth?"
					hoverClass="hover:scale-105 hover:shadow-lg"
				/>
			</div>

			<div className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
				<Card
					link="/User/alljobsTax"
					imageSrc={alljobsTax}
					imageAlt="Free tax refund eligibility check"
					imageWidth="85"
					imageHeight="89"
					content="Free tax refund eligibility check"
					hoverClass="hover:scale-105 hover:shadow-lg"
				/>
			</div>

			<div className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
				<Card
					link="/User/salaryCalculator"
					imageSrc={salaryCalculator}
					imageAlt="Salary calculators"
					imageWidth="85"
					imageHeight="89"
					content="Salary calculators"
					hoverClass="hover:scale-105 hover:shadow-lg"
				/>
			</div>

			<div className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
				<Card
					link="/User/interview"
					imageSrc={interview}
					imageAlt="Preparation for a job interview"
					imageWidth="85"
					imageHeight="89"
					content="Preparation for a job interview"
					hoverClass="hover:scale-105 hover:shadow-lg"
				/>
			</div>

			<div className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2">
				<Card
					link="/User/escrot"
					imageSrc={escrot}
					imageAlt="Personal support for finding a job"
					imageWidth="85"
					imageHeight="89"
					content="Personal support for finding a job"
					hoverClass="hover:scale-105 hover:shadow-lg"
				/>
			</div>
		</div>
	);
};

export default Cards;
