import axios from 'axios';

export const completarDatosUser = async (data, role) => {
  try {
    console.log('role que le llega a complete: ', role);
    const response = await axios.put(`http://localhost:3000/api/${role}/complete-data`, data, {
        withCredentials: true,
    });
    console.log('respuesta de complete:', response);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al completar los datos';
    throw new Error(errorMessage);
  }
};