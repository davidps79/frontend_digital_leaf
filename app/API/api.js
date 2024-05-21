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
    const response = await apiClient.patch(`auth/${id}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar el perfil del usuario');
  }
};

export const addEbook = async (ebookData) => {
  try {
    const response = await apiClient.post('ebooks', ebookData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al añadir un nuevo ebook');
  }
}

export const getBooks = async () => {
  try {
    const response = await apiClient.get('ebooks');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros');
  }
};

export const getBookById = async (id) => {
  try {
    const response = await apiClient.get(`ebooks/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el libro:', id);
  }
};

export const getBooksInfo = async (bookId) => {
  try {
    const response = await apiClient.get(`ebooks/info/${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el libro: ',bookId);
  }
};

export const getBooksByCategory = async (category) => {
  try{
    console.log("Categoria:",category);
    const response = await apiClient.get(`ebooks/category/${category}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por la categoria',category);
  }
}

export const getBooksBySearch = async (keyword) => {
  try{
    console.log("Keyword:",keyword);
    const response = await apiClient.get(`ebooks/search/${keyword}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por la busqueda',keyword);
  }
}


export const getBooksByAuthor = async (authorId) => {
  try{
    console.log("Autor: ",authorId);
    const response = await apiClient.get(`ebooks/author/${authorId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por autor',authorId);
  }
}

export const getBooksByAuthorAmount = async (amount,authorId) => {
  try{
    console.log("Autor: ",authorId);
    const response = await apiClient.get(`ebooks/author/${authorId}?page=1&limit=${amount}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por autor',authorId, " con cantidad :",amount);
  }
}

export const getBooksByCategoryAmount = async (amount,category) => {
  try{
    console.log("Categoria:",category);
    const response = await apiClient.get(`ebooks/category/${category}?page=1&limit=${amount}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por la categoria',category, " con cantidad :",amount);
  }
}