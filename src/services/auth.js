import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Inyecta token JWT en cada request si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * Login — requiere header x-tenant-prefix
 * @param {{ email: string, password: string }} data
 * @param {string} tenantPrefix
 */
export const loginUser = (data, tenantPrefix) =>
  api.post('/auth/login', data, {
    headers: { 'x-tenant-prefix': tenantPrefix },
  });

/**
 * Register — requiere header x-tenant-prefix
 * @param {{ email: string, password: string, first_name?: string, last_name?: string }} data
 * @param {string} tenantPrefix
 */
export const registerUser = (data, tenantPrefix) =>
  api.post('/auth/register', data, {
    headers: { 'x-tenant-prefix': tenantPrefix },
  });

export default api;
