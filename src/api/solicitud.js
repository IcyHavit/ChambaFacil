import axios from 'axios';

export const createSolicitud = async (solicitudData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/solicitud/create', solicitudData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating solicitud:', error);
    throw error;
  }
}