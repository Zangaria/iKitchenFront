// Import Axios for making HTTP requests
import axios from 'axios';
import {
  CREATE_RECIPE_FAIL,
  CREATE_RECIPE_REQUEST,
  CREATE_RECIPE_SUCCESS
 ,}  from '../constants/recipeConstants';
    

// Action creator function for creating a new recipe
export const createRecipeAction = (recipeData, token) => async (dispatch) => {
  try {
    // Dispatch an action to indicate the request is being made
    dispatch({ type: CREATE_RECIPE_REQUEST });

    // Set up request headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    };

    // Make POST request to create a new recipe
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/recipe/add`,
      recipeData,
      config
    );

    // Dispatch an action to indicate success and pass the created recipe data
    dispatch({
      type: CREATE_RECIPE_SUCCESS,
      payload: data
    });
  } catch (error) {
    // If there's an error, dispatch an action to indicate failure and pass the error message
    dispatch({
      type: CREATE_RECIPE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
};
