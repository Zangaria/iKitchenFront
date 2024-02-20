import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipeAction } from '../actions/recipeActions';
import { useNavigate } from 'react-router-dom';

const AddRecipePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const [formData, setFormData] = useState({
    recipeName: '',
    themeIMG: '',
    // Add more fields here as per your requirement
  });

  const { loading, recipe, error } = useSelector((state) => state.createRecipe);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecipeAction(formData, token)); // Pass the token to the action
  };

  // Check if error indicates token expiration and navigate to login page
  if (error && error.response && error.response.status === 407) {
    navigate('/login');
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {/* Recipe Name */}
        <div className="mb-4">
          <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700">Recipe Name</label>
          <input type="text" id="recipeName" name="recipeName" value={formData.recipeName} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        {/* Theme Image URL */}
        <div className="mb-4">
          <label htmlFor="themeIMG" className="block text-sm font-medium text-gray-700">Theme Image URL</label>
          <input type="text" id="themeIMG" name="themeIMG" value={formData.themeIMG} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        {/* Add more fields here as per your requirement */}

        {/* Submit Button */}
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            {loading ? 'Adding Recipe...' : 'Add Recipe'}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Success Message */}
        {recipe && <p className="mt-4 text-green-500">Recipe added successfully!</p>}
      </form>
    </div>
  );
};

export default AddRecipePage;
