import React, { useState } from 'react';

const Search = () => {
	const [isFreeSearch, setIsFreeSearch] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState('All Categories');
	const [selectedRole, setSelectedRole] = useState('All Roles');
	const [selectedLocation, setSelectedLocation] = useState('All Locations');

	const toggleSearchType = (value) => {
		setIsFreeSearch(value);
	};

	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
	};

	const handleRoleChange = (event) => {
		setSelectedRole(event.target.value);
	};

	const handleLocationChange = (event) => {
		setSelectedLocation(event.target.value);
	};
	return (
		<div className="text-black py-20 bg-white flex flex-col items-center justify-center">
			<div className="w-4/5 max-w-xl mb-8 flex space-x-4">
				<button
					className={`flex-1 text-white ${
						isFreeSearch ? 'bg-teal-500' : 'bg-gray-300'
					} focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 hover:bg-teal-600 hover:ring-teal-400`}
					onClick={() => toggleSearchType(true)}
				>
					Free Search
				</button>
				<button
					className={`flex-1 text-white ${
						!isFreeSearch ? 'bg-teal-500' : 'bg-gray-300'
					} focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 hover:bg-teal-600 hover:ring-teal-400`}
					onClick={() => toggleSearchType(false)}
				>
					Advanced Search
				</button>
			</div>

			<div className="w-4/5 max-w-xl border rounded overflow-hidden flex items-stretch h-[3rem]">
				{isFreeSearch ? (
					<input type="text" className="flex-1 px-4 py-3 rounded-l" placeholder="Free Search..." />
				) : (
					<>
						<select
							className="flex-1 px-4 py-3 rounded-l"
							value={selectedCategory}
							onChange={handleCategoryChange}
						>
							<option value="All Categories">All Categories</option>
							<option value="Technology">Technology</option>
							<option value="Finance">Finance</option>
							<option value="Healthcare">Healthcare</option>
							{/* Add more categories as needed */}
						</select>

						<select className="flex-1 px-4 py-3" value={selectedRole} onChange={handleRoleChange}>
							<option value="All Roles">All Roles</option>
							<option value="Developer">Developer</option>
							<option value="Designer">Designer</option>
							<option value="Manager">Manager</option>
							{/* Add more roles as needed */}
						</select>

						<select
							className="flex-1 px-4 py-3 rounded-r"
							value={selectedLocation}
							onChange={handleLocationChange}
						>
							<option value="All Locations">All Locations</option>
							<option value="New York">New York</option>
							<option value="San Francisco">San Francisco</option>
							<option value="London">London</option>
							{/* Add more locations as needed */}
						</select>
					</>
				)}
				<button
					type="submit"
					className="flex items-center justify-center px-4 border-l rounded-r rounded-l-none text-white bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 hover:bg-teal-600 hover:ring-teal-400"
				>
					Go
				</button>
			</div>
		</div>
	);
};

export default Search;
