// enterpriseActions.jsx
import axios from 'axios';
import {
	ENTERPRISE_CREATE_REQUEST,
	ENTERPRISE_CREATE_SUCCESS,
	ENTERPRISE_CREATE_FAIL,
} from '../constants/enterpriseConstants';

export const createEnterprise = (formData) => async (dispatch) => {
	try {
		dispatch({ type: ENTERPRISE_CREATE_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/enterprise/add`,
			formData,
			config
		);

		dispatch({ type: ENTERPRISE_CREATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ENTERPRISE_CREATE_FAIL,
			payload:
				error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};
