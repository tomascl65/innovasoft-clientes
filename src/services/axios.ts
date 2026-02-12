import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pruebareactjs.test-class.com/Api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud para agregar el token
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Interceptor de respuesta para manejar errores globales
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Error 401 - No autorizado, limpiar sesión
      // Excluir la ruta de login: un 401 ahí significa credenciales incorrectas,
      // no una sesión expirada, así que no debe redirigir.
      const requestUrl = (error.config?.url || '').toLowerCase();
      const isLoginRequest = requestUrl.includes('authenticate/login');

      if (error.response.status === 401 && !isLoginRequest) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('expiration');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('expiration');
        window.location.href = '/login';
      }

      if (error.response.status === 500) {
        console.error('Error del servidor:', error.response.data);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
