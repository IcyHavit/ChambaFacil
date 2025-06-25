import axios from 'axios';

export const registerUser = async (data, role) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/${role}/register`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al registrar. Por favor, intenta nuevamente.';
    throw new Error(errorMessage);
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/api/user/login', data, {
      withCredentials: true,
    });
    console.log('Response: ', response);
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al iniciar sesión. Por favor, intenta nuevamente.';
    throw new Error(errorMessage);
  }
};

export const registerPrestamistaGoogle = async (accessToken) => {
    console.log('Token de Googlereg:', accessToken);
    try {
      const response = await axios.post('http://localhost:3000/api/prestamista/register-google', {accessToken}, {
          withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al registrar. Por favor, intenta nuevamente.';
      throw new Error(errorMessage);
    }
}

export const loginGoogle = async (accessToken) => {
  console.log('Token de Google login:', accessToken);
  try {
    const response = await axios.post('http://localhost:3000/api/user/login-google', {accessToken
    }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || 'Error al iniciar sesión. Por favor, intenta nuevamente.';
    throw new Error(errorMessage);
  }
};

export const errorGoogleHandler = () => {
  console.log('Error al autenticar con Google');
};