import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEnterprise } from '../actions/enterpriseActions';

const CreateEnterprise = () => {
	const [formData, setFormData] = useState({
		name: '',
		bnNumber: '',
		info: [],
		locations: [],
		contact: [],
		logo: '',
		imgs: [],
		employees: [],
	});

	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createEnterprise(formData));
	};

	return (
		<section className="flex items-center justify-center container mx-auto py-12">
			<div className="w-5/6 md:w-8/12 lg:w-5/12 xl:w-5/12 flex flex-col items-center justify-center">
				<form onSubmit={handleSubmit} className="w-full">
					<div className="text-4xl font-bold leading-tight tracking-tight text-teal-500 md:text-3xl dark:text-white mb-4 text-center">
						Create Enterprise
					</div>

					<label className="block">
						<span className="text-gray-700">Name:</span>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
							required
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">BN Number:</span>
						<input
							type="text"
							name="bnNumber"
							value={formData.bnNumber}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
							required
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Information:</span>
						<textarea
							name="info"
							value={formData.info}
							onChange={handleChange}
							className="w-full py-3 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300 resize-y"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Locations:</span>
						<textarea
							name="locations"
							value={formData.locations}
							onChange={handleChange}
							className="w-full py-3 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300 resize-y"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Contact:</span>
						<textarea
							name="contact"
							value={formData.contact}
							onChange={handleChange}
							className="w-full py-3 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300 resize-y"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Logo:</span>
						<input
							type="text"
							name="logo"
							value={formData.logo}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Images:</span>
						<textarea
							name="imgs"
							value={formData.imgs}
							onChange={handleChange}
							className="w-full py-3 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300 resize-y"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Employees:</span>
						<textarea
							name="employees"
							value={formData.employees}
							onChange={handleChange}
							className="w-full py-3 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300 resize-y"
						/>
					</label>

					<button
						type="submit"
						className="w-full mt-4 text-white bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 hover:bg-teal-600 hover:ring-teal-400"
					>
						Create Enterprise
					</button>
				</form>
			</div>
		</section>
	);
};

export default CreateEnterprise;
