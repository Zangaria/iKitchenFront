import React from 'react';

const JobBlock = ({ title, info, buttonText, onClick }) => {
	return (
		<div className="border border-teal-500 bg-white shadow-md rounded p-4 mb-4 flex flex-col justify-between items-center">
			<div>
				<h3 className="text-xl font-semibold mb-2">{title}</h3>
				<p className="text-gray-600 mb-4">{info}</p>
			</div>
			<button
				className="text-white bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 hover:bg-teal-600 hover:ring-teal-400"
				onClick={onClick}
			>
				{buttonText}
			</button>
		</div>
	);
};

export default JobBlock;
