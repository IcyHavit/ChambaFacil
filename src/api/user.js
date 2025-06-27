import axios from 'axios';

export const completarDatosUser = async (data, role) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/${role}/complete-data`, data, {
        withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al completar los datos';
    throw new Error(errorMessage);
  }
};

export const getDataUser = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/prestamista/get-data/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al obtener datos';
    throw new Error(errorMessage);
  }
}