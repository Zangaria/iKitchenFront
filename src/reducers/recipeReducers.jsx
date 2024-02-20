import {
    CREATE_RECIPE_REQUEST,
    CREATE_RECIPE_SUCCESS,
    CREATE_RECIPE_FAIL
  } from '../constants/recipeConstants';
  
  // Initial state for the recipe creation process
  const initialState = {
    loading: false, 
    recipe: null,   
    error: null    
  };
  
  // Reducer function for handling recipe creation actions
  export const createRecipeReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_RECIPE_REQUEST:
        return {
          ...state,
          loading: true,
          recipe: null,
          error: null
        };
      case CREATE_RECIPE_SUCCESS:
        return {
          ...state,
          loading: false,
          recipe: payload,
          error: null
        };
      case CREATE_RECIPE_FAIL:
        return {
          ...state,
          loading: false,
          recipe: null,
          error: payload
        };
      default:
        return state;
    }
  };
  