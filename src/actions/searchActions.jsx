import axios from 'axios';
import { jobCreateRequest, jobCreateSuccess, jobCreateFail } from '../reducers/jobReducers';

export const fetchJobsByText = (title) => async (dispatch) => {
	// console.log('searchParams', searchParams);
	try {
		dispatch(jobCreateRequest());

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		// Make a GET request to the jobs endpoint with searchParams
		const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/job/add`, {
			params: title,
		});

		dispatch(jobCreateSuccess(data.msg));
	} catch (err) {
		dispatch(
			jobCreateFail(err.response && err.response.data.msg ? err.response.data.msg : err.message)
		);
	}
};
