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

// Función para eliminar una solicitud
export const deleteSolicitud = async (idSolicitud) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/solicitud/delete/${idSolicitud}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting solicitud:', error);
    throw error;
  }
};


// Función para obtener las solicitudes de un usuario (cliente o prestamista)
export const getSolicitudesByUser = async (idUser) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/solicitud/get-by-user/${idUser}`);
    
    // Aquí puedes manejar la respuesta
    console.log('Solicitudes:', response.data);
    
    // Puedes devolver las solicitudes si las necesitas en otro lugar
    return response.data;
  } catch (error) {
    console.error('Error fetching solicitudes:', error);
    throw error;
  }
};

// Función para actualizar el estado de la solicitud
export const updateSolicitudState = async (idSolicitud, nuevoEstado) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/solicitud/update-state/${idSolicitud}/${nuevoEstado}`, {
      withCredentials: true,
    });

    console.log('Estado actualizado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el estado de la solicitud:', error);
    throw error;
  }
};