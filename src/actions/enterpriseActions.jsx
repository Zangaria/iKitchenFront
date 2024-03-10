import axios from 'axios';
import {
	enterpriseCreateRequest,
	enterpriseCreateSuccess,
	enterpriseCreateFail,
} from '../reducers/enterpriseReducers';

export const createEnterprise = (formData, token) => async (dispatch) => {
	try {
		dispatch(enterpriseCreateRequest());

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/enterprise/add`,
			formData,
			config
		);

		dispatch(enterpriseCreateSuccess(data));
	} catch (error) {
		dispatch(
			enterpriseCreateFail(
				error.response && error.response.data.message ? error.response.data.message : error.message
			)
		);
	}
};
