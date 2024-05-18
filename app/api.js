import apiClient from './apiClient';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error details:', error.response?.data); 
    throw new Error(error.response?.data?.message || 'Error en la autenticación');
  }
};
