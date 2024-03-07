// enterpriseReducers.jsx
import {
	ENTERPRISE_CREATE_REQUEST,
	ENTERPRISE_CREATE_SUCCESS,
	ENTERPRISE_CREATE_FAIL,
} from '../constants/enterpriseConstants';

const initialState = {
	loading: false,
	error: null,
	enterprise: null,
};

export const enterpriseReducer = (state = initialState, action) => {
	switch (action.type) {
		case ENTERPRISE_CREATE_REQUEST:
			return { ...state, loading: true };

		case ENTERPRISE_CREATE_SUCCESS:
			return { ...state, loading: false, enterprise: action.payload, error: null };

		case ENTERPRISE_CREATE_FAIL:
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};
