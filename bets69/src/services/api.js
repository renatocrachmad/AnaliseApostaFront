import axios from 'axios';
import { getToken } from '../utils/auth';

// Criação da instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:5432/bets69', 
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
