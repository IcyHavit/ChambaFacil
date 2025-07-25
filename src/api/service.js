import axios from 'axios';

export const createService = async (data) => {
  try {
    console.log('Datos del servicio:', data);
    const response = await axios.post('http://localhost:3000/api/servicio/create', data, {
      withCredentials: true,
    });
    console.log('Respuesta del servidor:', response);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al registrar. Por favor, intenta nuevamente.';
    throw new Error(errorMessage);
  }
};

export const searchServices = async (trabajo, zona) => {
  try {
    const response = await axios.get('http://localhost:3000/api/servicio/search', {
      params: {
        trabajo,
        zona,
      },
      withCredentials: true,
    });
    return response.data.servicios;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al buscar servicios.';
    throw new Error(errorMessage);
  }
};

export const getService = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/servicio/get-service/${id}`, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al registrar. Por favor, intenta nuevamente.';
    throw new Error(errorMessage);
  }
}