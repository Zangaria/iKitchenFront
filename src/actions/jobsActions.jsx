import axios from 'axios';
import { jobCreateRequest, jobCreateSuccess, jobCreateFail } from '../reducers/jobReducers';

export const createJobAction = (jobData, token) => async (dispatch) => {
	try {
		console.log('mm');
		dispatch(jobCreateRequest());

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/job/create`,
			jobData,
			config
		);
		console.log(data);
		dispatch(jobCreateSuccess(data));
	} catch (error) {
		dispatch(
			jobCreateFail(
				error.response && error.response.data.message ? error.response.data.message : error.message
			)
		);
	}
};
