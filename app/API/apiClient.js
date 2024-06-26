import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://backend-grupo-13.onrender.com/",
  //baseURL: "http://localhost:3001/",
  headers: { 'Content-Type': 'application/json' }
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
    console.error("Error", error);
    return Promise.reject(error);
  }
);

export default apiClient;
