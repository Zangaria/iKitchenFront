import axios from 'axios';
import { searchRequest, searchSuccess, searchFail } from '../reducers/searchReducers';

export const fetchJobsByText =
	({ title, from, to }) =>
	async (dispatch) => {
		try {
			dispatch(searchRequest());

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			// Make a GET request to the jobs endpoint with searchParams
			const { data } = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/search?title=${title}&from=${from}&to=${to}`
			);
			console.log('data', data);
			if (data.total === 0) {
				dispatch(searchFail('There are no result to this job'));
			}
			if (data.total > 0) {
				dispatch(searchSuccess(data.jobs));
			}
		} catch (err) {
			dispatch(
				searchFail(err.response && err.response.data.error ? err.response.data.error : err.message)
			);
		}
	};
