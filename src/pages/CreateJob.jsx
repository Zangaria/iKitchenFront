import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createJobAction } from '../actions/jobsActions';

const CreateJob = () => {
	const [formData, setFormData] = useState({
		title: '',
		enterprise: '',
		entPublic: true,
		tags: [],
		location: '',
		info: [],
		requirements: [],
		mContact: [],
		applicants: [],
	});

	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(createJobAction(formData));
		// You can add additional logic here, such as resetting the form or displaying a success message
	};

	return (
		<div>
			<h2>Create Job</h2>
			<form onSubmit={handleSubmit}>
				{/* Title Input */}
				<label>
					Title:
					<input type="text" name="title" value={formData.title} onChange={handleChange} />
				</label>
				<br />
				{/* Enterprise Input */}
				<label>
					Enterprise:
					<input
						type="text"
						name="enterprise"
						value={formData.enterprise}
						onChange={handleChange}
					/>
				</label>
				<br />
				{/* Other inputs go here... */}
				<button type="submit">Create Job</button>
			</form>
		</div>
	);
};

export default CreateJob;
