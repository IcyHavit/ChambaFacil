import axios from 'axios';

export const completarDatosPrestamista = async (data) => {
  try {
    const response = await axios.put('http://localhost:3000/api/prestamista/complete-data', data, {
        withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al completar los datos';
    throw new Error(errorMessage);
  }
};