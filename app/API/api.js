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

export const getUserById = async (id, token) => {
  try {
    const response = await apiClient.get(`/auth/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el perfil del usuario');
  }
};

export const getAuthorProfile = async (id, token) => {
  try {
    const response = await apiClient.get(`/auth/author/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el perfil del autor');
  }
};

export const getReaderProfile = async (id, token) => {
  try {
    const response = await apiClient.get(`/auth/reader/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el perfil del lector');
  }
};

export const updateUser = async (id, updateData, token) => {
  try {
    const response = await apiClient.patch(`/auth/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar el perfil del usuario');
  }
};

export const addEbook = async (token, ebookData) => {
  try {
    const response = await apiClient.post('ebooks', ebookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al añadir un nuevo ebook');
  }
};


export const getBooks = async (page,limit) => {
  try {
    const response = await apiClient.get(`ebooks?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros');
  }
};

export const getNumberBooks = async () => {
  try {
    const response = await apiClient.get('ebooks/amount');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el numero los libros');
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

export const getBooksByCategory = async (category, page, limit) => {
  try{
    console.log("Categoria:",category);
    const response = await apiClient.get(`ebooks/category/${category}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por la categoria',category);
  }
}

export const getNumberBooksByCategory = async (category) => {
  try{
    console.log("Categoria:",category);
    const response = await apiClient.get(`ebooks/category/amount/${category}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener la cantidad de los libros por la categoria',category);
  }
}

export const getBooksBySearch = async (keyword, page, limit) => {
  try{
    console.log("Keyword:",keyword);
    const response = await apiClient.get(`ebooks/search/${keyword}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por la busqueda',keyword);
  }
}

export const getNumberBooksBySearch = async (keyword) => {
  try{
    console.log("Keyword:",keyword);
    const response = await apiClient.get(`ebooks/search/amount${keyword}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por la busqueda',keyword);
  }
}


export const getBooksByAuthor = async (authorId, page, limit) => {
  try{
    console.log("Autor: ",authorId);
    const response = await apiClient.get(`ebooks/author/${authorId}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por autor',authorId);
  }
}

export const getNumberBooksByAuthor = async (authorId) => {
  try{
    console.log("Autor: ",authorId);
    const response = await apiClient.get(`ebooks/author/${authorId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener cantidad de los libros por autor',authorId);
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

export const getBooksByRating = async (rating) => {
  try{
    const response = await apiClient.get(`ebooks/sorted/${rating}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener los libros por rating',rating);
  }
}

export const getNumberBooksByRating = async (rating) => {
  try{
    const response = await apiClient.get(`ebooks/sorted/amount/${rating}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener cantidad los libros por rating',rating);
  }
}

export const getShoppingCart = async () => {
  try {
    const response = await apiClient.get('shoppingcart');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el carrito de compras');
  }
};

export const buyShoppingCart = async () => {
  try {
    const response = await apiClient.get('shoppingcart/buy');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al comprar el carrito de compras');
  }
};

export const updateShoppingCart = async (updateShoppingCartDto) => {
  try {
    const response = await apiClient.put('shoppingcart', updateShoppingCartDto);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al actualizar el carrito de compras');
  }
};

export const removeShoppingCart = async () => {
  try {
    const response = await apiClient.delete('shoppingcart');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al eliminar el carrito de compras');
  }
};
