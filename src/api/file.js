import axios from 'axios';

export const uploadFile = async (file, type) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`http://localhost:3000/api/upload/single/${type}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return response.data; // Retorna fileName, link
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al subir el archivo. Por favor, intenta nuevamente.';
        throw new Error(errorMessage);
    }
};