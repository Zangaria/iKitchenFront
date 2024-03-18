import axios from 'axios';
import {
	jobCreateRequest,
	jobCreateSuccess,
	jobCreateFail,
	cvAddSuccess,
	cvAddRequest,
	cvAddFail,
} from '../reducers/jobReducers';

export const createJobAction = (jobData) => async (dispatch) => {
	try {
		dispatch(jobCreateRequest());
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		};

		const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/job/add`, jobData, config);
		if (data.err) {
			console.log('failed');
			jobCreateFail(data.msg);
		} else {
			console.log('succses');
			dispatch(jobCreateSuccess(data));
		}
	} catch (error) {
		dispatch(
			jobCreateFail(
				error.response && error.response.data.error ? error.response.data.error : error.message
			)
		);
	}
};

export const addCVAction = (cvData) => async (dispatch) => {
	try {
		dispatch(cvAddRequest());
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		};

		const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/cv/add`, cvData, config);
		if (data.error) {
			console.log('Failed to add CV');
			dispatch(cvAddFail(data.msg));
		} else {
			console.log('CV added successfully');
			dispatch(cvAddSuccess(data));
		}
	} catch (error) {
		dispatch(
			cvAddFail(
				error.response && error.response.data.error ? error.response.data.error : error.message
			)
		);
	}
};
