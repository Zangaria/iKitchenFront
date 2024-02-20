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
    tags: [],
    cookTime: '',
    difficulty: '',
    adjustable: false,
    body: {
      sIngred: [],
      sIngredQt: [],
      sIngredMsr: ['gr'],
      sInstruct: [],
    },
    tips: [],
    closing: ["that's all, folks!"]
  });

  const { loading, recipe, error } = useSelector((state) => state.createRecipe);
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormData({
        ...formData,
        tags: value.split(',')
      });
    } else if (name === 'sIngred' || name === 'sIngredQt' || name === 'sInstruct') {
      const bodyData = { ...formData.body };
      bodyData[name] = value.split(',');
      setFormData({
        ...formData,
        body: bodyData
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        {/* Cook Time */}
        <div className="mb-4">
          <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700">Cook Time (minutes)</label>
          <input type="number" id="cookTime" name="cookTime" value={formData.cookTime} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty (0-3)</label>
          <input type="number" id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} min="0" max="3" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        {/* Adjustable */}
        <div className="mb-4">
          <label htmlFor="adjustable" className="block text-sm font-medium text-gray-700">Adjustable</label>
          <input type="checkbox" id="adjustable" name="adjustable" checked={formData.adjustable} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label htmlFor="sIngred" className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
          <input type="text" id="sIngred" name="sIngred" value={formData.body.sIngred} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        {/* Ingredients Quantity */}
        <div className="mb-4">
          <label htmlFor="sIngredQt" className="block text-sm font-medium text-gray-700">Ingredients Quantity (comma separated)</label>
          <input type="text" id="sIngredQt" name="sIngredQt" value={formData.body.sIngredQt} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <label htmlFor="sInstruct" className="block text-sm font-medium text-gray-700">Instructions (comma separated)</label>
          <input type="text" id="sInstruct" name="sInstruct" value={formData.body.sInstruct} onChange={handleChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

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
