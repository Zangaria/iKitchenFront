import axios from 'axios';
import {
	jobCreateRequest,
	jobCreateSuccess,
	jobCreateFail,
	cvAddSuccess,
	cvAddRequest,
	cvAddFail,
	addJobToFavoriteSuccess,
	addJobToFavoriteRequest,
	addJobToFavoriteFail,
	removeJobFromFavoritesRequest,
	removeJobFromFavoritesFail,
	removeJobFromFavoritesSuccess,
} from '../reducers/jobReducers';
import { getUserInfo } from './userActions';

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
	lkjnlj: 'ojnj',
};

export const addCVAction = (cvData) => async (dispatch) => {
	// console.log(cvData);
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
		console.log('Failed to add CV');
		console.log(error.response.data.error);
		dispatch(
			cvAddFail(
				error.response && error.response.data.error ? error.response.data.error : error.message
			)
		);
	}
};

export const addJobToFavorites = (jobId) => async (dispatch, getState) => {
	try {
		// Dispatch action to indicate the start of the request
		dispatch(addJobToFavoriteRequest());

		// Get the favoritesJobs array from the Redux state
		const { favoritesJobs } = getState().user.userInfo;

		// Map over the favoritesJobs array to extract only the IDs
		const favoritesJobsIds = favoritesJobs.map((job) => job._id);

		// Add the new job ID to the favoritesJobsIds array
		const updatedFavoritesJobsIds = [...favoritesJobsIds, jobId];

		// Define the request body with the updated favoritesJobsIds array
		const requestBody = {
			favoritesJobs: updatedFavoritesJobsIds,
		};

		// Define the request configuration
		const config = {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		};

		// Make the request to update user favorites jobs with the new IDs
		const { data } = await axios.patch(
			`${process.env.REACT_APP_BASE_URL}/user/updateUser`,
			requestBody,
			config
		);

		if (data.code === 200) {
			console.log('success');
			dispatch(getUserInfo());
		}
	} catch (error) {
		// Dispatch failure action with error message
		dispatch(
			addJobToFavoriteFail(
				error.response && error.response.data.msg ? error.response.data.msg : error.message
			)
		);
	}
};

export const removeJobFromFavoritesAction = (jobId) => async (dispatch, getState) => {
	try {
		// Dispatch action to indicate the start of the request
		dispatch(removeJobFromFavoritesRequest());

		// Get the favoritesJobs array from the Redux state
		const { favoritesJobs } = getState().user.userInfo;

		// Filter out the job with the given jobId
		const updatedFavoritesJobs = favoritesJobs.filter((job) => job._id !== jobId);

		// Extract IDs from the updated favoritesJobs array
		const updatedFavoritesJobsIds = updatedFavoritesJobs.map((job) => job._id);

		// Define the request body with the updated favoritesJobsIds array
		const requestBody = {
			favoritesJobs: updatedFavoritesJobsIds,
		};

		// Define the request configuration
		const config = {
			headers: {
				Authorization: localStorage.getItem('token'),
			},
		};

		// Make the request to update user favorites jobs with the new IDs
		const { data } = await axios.patch(
			`${process.env.REACT_APP_BASE_URL}/user/updateUser`,
			requestBody,
			config
		);
		console.log(data);
		if (data.code === 200) {
			console.log('Job removed from favorites successfully');
			dispatch(getUserInfo());
		} else {
			console.log('error');
		}
	} catch (error) {
		// Dispatch failure action with error message
		// dispatch(
		// 	removeJobFromFavoritesFail(
		// 		error.response && error.response.data.msg ? error.response.data.msg : error.message
		// 	)
		// );
		console.log(error.response);
	}
};
