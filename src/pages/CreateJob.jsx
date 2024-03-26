import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJobAction } from '../actions/jobsActions';

const CreateJob = () => {
	const [formData, setFormData] = useState({
		title: '',
		entPublic: true,
		tags: '',
		location: '',
		info: '',
		requirements: '',
		contactName: '',
		contactEmail: '',
		contactPhone: '',
		contactCelphone: '',
	});

	const dispatch = useDispatch();
	const { error, job } = useSelector((state) => state.job);
	const invalidToken = useSelector((state) => state.user.invalidToken);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;

		// For checkboxes, toggle the boolean value
		const newValue = type === 'checkbox' ? checked : value;

		setFormData((prevState) => ({
			...prevState,
			[name]: newValue,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createJobAction(formData));
	};

	useEffect(() => {
		console.log('user', invalidToken);
		if (invalidToken) {
			alert('Invalid token, please login again.');
			window.location.href = '/login';
		}
	}, [invalidToken]);

	return (
		<section className="flex items-center justify-center container mx-auto py-12">
			<div className="w-5/6 md:w-8/12 lg:w-5/12 xl:w-5/12 flex flex-col items-center justify-center">
				<form onSubmit={handleSubmit} className="w-full">
					<div className="text-4xl font-bold leading-tight tracking-tight text-teal-500 md:text-3xl dark:text-white mb-4 text-center">
						Create Job
					</div>

					<label className="block">
						<span className="text-gray-700">Title:</span>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
							required
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Tags (comma-separated):</span>
						<input
							type="text"
							name="tags"
							value={formData.tags}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Location:</span>
						<input
							type="text"
							name="location"
							value={formData.location}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
							required
						/>
					</label>

					<label className="block">
						<span className="text-gray-700"> Information about the job:</span>
						<textarea
							name="info"
							value={formData.info}
							onChange={handleChange}
							className="w-full py-3 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300 resize-y"
							required
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Requirements:</span>
						<textarea
							name="requirements"
							value={formData.requirements}
							onChange={handleChange}
							className="w-full py-3 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300 resize-y"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Contact name:</span>
						<input
							type="text"
							name="contactName"
							value={formData.contactName}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Contact Email:</span>
						<input
							type="text"
							name="contactEmail"
							value={formData.contactEmail}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
							required={true}
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Contact Phone:</span>
						<input
							type="text"
							name="contactPhone"
							value={formData.contactPhone}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						/>
					</label>

					<label className="block">
						<span className="text-gray-700">Contact Cellphone:</span>
						<input
							type="text"
							name="contactCelphone"
							value={formData.contactCelphone}
							onChange={handleChange}
							className="w-full py-2 px-4 mb-6 border-b border-gray-300 focus:outline-none focus:border-teal-500 dark:border-neutral-600 dark:focus:border-teal-300"
						/>
					</label>

					<label className="block py-8">
						<span className="text-gray-700">Make Enterprise Public:</span>
						<input
							type="checkbox"
							name="entPublic"
							checked={formData.entPublic}
							onChange={handleChange}
							className="form-checkbox mt-1 ms-2"
						/>
					</label>

					<button
						type="submit"
						className="w-full mt-4 text-white bg-teal-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-500 dark:focus:ring-teal-300 hover:bg-teal-600 hover:ring-teal-400"
					>
						Create Job
					</button>
					{error && <div className="text-red-500 text-center mt-4">{error}</div>}
					{job && (
						<div className="bg-green-500 text-white text-center rounded-md p-2 mb-4 mt-4">
							{`Job created`}
						</div>
					)}
				</form>
			</div>
		</section>
	);
};

export default CreateJob;
