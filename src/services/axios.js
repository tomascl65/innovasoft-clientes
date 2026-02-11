import axios from 'axios';

// Crear instancia de Axios
const axiosInstance = axios.create({
  baseURL: 'https://pruebareactjs.test-class.com/Api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de solicitud para agregar el token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores globales
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Error 401 - No autorizado, limpiar sesión
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        window.location.href = '/login';
      }
      
      // Error 500 - Error del servidor
      if (error.response.status === 500) {
        console.error('Error del servidor:', error.response.data);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
