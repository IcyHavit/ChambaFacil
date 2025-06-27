import axios from 'axios';

// Obtener los chats recientes del usuario
export const getRecentChats = async (actualUserEmail) => {
  try {
    const response = await axios.get('http://localhost:3000/api/chat/last-messages/' + actualUserEmail);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent chats:', error);
  }
}

// Enviar un mensaje
export const sendChatMessage = async (messageData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/chat/send', messageData);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Obtener los mensajes de un chat específico entre dos usuarios
export const getChatMessages = async (actualUserEmail, contactEmail) => {
  try {
    const response = await axios.get('http://localhost:3000/api/chat/messages/' + actualUserEmail + '/' + contactEmail);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
};

// Obtener los datos de contacto de un usuario
export const getContactData = async (actualUserEmail, contactEmail) => {
  try {
    const response = await axios.get('http://localhost:3000/api/chat/user-profile/' + actualUserEmail + '/' + contactEmail);
    return response.data;
  } catch (error) {
    console.error('Error fetching contact data:', error);
    throw error;
  }
};

// Subir una imagen al servidor
export const uploadChatImage = async (formData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/upload/single/chat-uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data;    
    
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};