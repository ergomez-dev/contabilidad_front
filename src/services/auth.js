import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Registra un nuevo usuario.
 * @param {{ nombre: string, email: string, password: string }} data
 */
export const register = (data) => api.post('/auth/register', data);

/**
 * Inicia sesión con email y contraseña.
 * @param {{ email: string, password: string }} data
 */
export const login = (data) => api.post('/auth/login', data);

export default api;
