// Import the action types
import {
	NEW_INGREDIENT_REQUEST,
	NEW_INGREDIENT_SUCCESS,
	NEW_INGREDIENT_FAIL,
} from '../constants/ingredientConstants';

// Define the reducer function
export const newIngredientReducer = (state = {}, action) => {
	const { type, payload } = action;

	switch (type) {
		case NEW_INGREDIENT_REQUEST:
			return {
				...state,
				loading: true,
				error: null,
				data: null,
			};
		case NEW_INGREDIENT_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				data: payload,
			};
		case NEW_INGREDIENT_FAIL:
			return {
				...state,
				loading: false,
				error: payload,
				data: null,
			};
		default:
			return state;
	}
};
