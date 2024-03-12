import axios from 'axios';
import {
	enterpriseCreateRequest,
	enterpriseCreateSuccess,
	enterpriseCreateFail,
} from '../reducers/enterpriseReducers';

export const createEnterprise = (formData) => async (dispatch) => {
	try {
		const token = localStorage.getItem('token');
		// console.log(token);
		// console.log(formData);
		dispatch(enterpriseCreateRequest());

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`,
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/enterprise/add`,
			formData,
			config
		);
		console.log(data);
		if (data.err) {
			console.log('failed');
			dispatch(enterpriseCreateFail(data.msg));
		} else {
			console.log('succses');
			dispatch(enterpriseCreateSuccess(data));
		}
	} catch (error) {
		console.log(error.response.data.error);
		dispatch(
			enterpriseCreateFail(
				error.response && error.response.data.error ? error.response.data.error : error.message
			)
		);
	}
};
