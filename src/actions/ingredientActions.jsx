export const newIngredientAction = (ingredientData, token) => async (dispatch) => {
	try {
		dispatch({ type: NEW_INGREDIENT_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BASE_URL}/ingredient/add`,
			ingredientData,
			config
		);

		dispatch({
			type: NEW_INGREDIENT_SUCCESS,
			payload: data,
		});
	} catch (err) {
		dispatch({
			type: NEW_INGREDIENT_FAIL,
			payload: err.response && err.response.data.message ? err.response.data.message : err.message,
		});
	}
};
