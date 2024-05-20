import apiClient from './apiClient';

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Error en la autenticación');
  }
};

export const register = async (userData) => {
  try {
    const response = await apiClient.post('auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el registro');
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`auth/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el perfil del usuario');
  }
};

export const getAuthorProfile = async (id) => {
  try {
    const response = await apiClient.get(`auth/author/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el perfil del autor');
  }
};

export const getReaderProfile = async (id) => {
  try {
    const response = await apiClient.get(`auth/reader/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el perfil del lector');
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const response = await apiClient.patch(`/auth/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar el perfil del usuario');
  }
};

export const addEbook = async (ebookData) => {
  try {
    const response = await apiClient.post('/ebooks', ebookData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al añadir un nuevo ebook');
  }
}

export const getBooks = async () => {
  try {
    const response = await apiClient.get('/ebooks');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros');
  }
};