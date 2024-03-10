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
		<div>
			<h2>Create Enterprise</h2>
			<form onSubmit={handleSubmit}>
				{/* Name Input */}
				<label>
					Name:
					<input type="text" name="name" value={formData.name} onChange={handleChange} />
				</label>
				<br />
				{/* BN Number Input */}
				<label>
					BN Number:
					<input type="text" name="bnNumber" value={formData.bnNumber} onChange={handleChange} />
				</label>
				<br />
				{/* Other inputs go here... */}
				<button type="submit" className=" bg-green-500">
					Create Enterprise
				</button>
			</form>
		</div>
	);
};

export default CreateEnterprise;
