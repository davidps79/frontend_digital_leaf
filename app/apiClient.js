import axios from 'axios';

const apiClient = axios.create({ 
    baseURL: 'http://localhost:3001/', 
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
