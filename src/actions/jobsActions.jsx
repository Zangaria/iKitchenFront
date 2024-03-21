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

const test = {
	jobid: '65fa1f31ecf91cc0c821845e',
	email: 'yigal@gmail.com',
	firstName: 'yigal',
	lastName: 'lipsey',
	pdfText: 'blah blah',
	phone: '0533350910',
};

export const addCVAction = (cvData) => async (dispatch) => {
	console.log(cvData);
	try {
		dispatch(cvAddRequest());
		const token = localStorage.getItem('token');
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/user/addResume`,
			cvData,
			config
		);
		console.log('data of add cv', data);
		if (data.error) {
			console.log('Failed to add CV');
			dispatch(cvAddFail(data.msg));
		} else {
			console.log('CV added successfully');
			dispatch(cvAddSuccess(data));
		}
	} catch (error) {
		console.log(error.response.data);
		dispatch(
			cvAddFail(
				error.response && error.response.data.error ? error.response.data.error : error.message
			)
		);
	}
};
