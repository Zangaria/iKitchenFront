import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../actions/userActions';
import axios from 'axios';

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

	const userLoginState = useSelector((state) => state.userLogin);
	const { loading, error, isAuthenticated } = userLoginState;

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
				<label>
					Name:
					<input type="text" name="name" value={formData.name} onChange={handleChange} required />
				</label>
				<label>
					BN Number:
					<input type="text" name="bnNumber" value={formData.bnNumber} onChange={handleChange} />
				</label>
				{/* Add other form fields for enterprise information */}
				<button type="submit">Create Enterprise</button>
			</form>
		</div>
	);
};

export default CreateEnterprise;
