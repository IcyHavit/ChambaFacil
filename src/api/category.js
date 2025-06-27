import axios from 'axios';

// Obtener las categorías
export const getCategories = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/category/get-categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}