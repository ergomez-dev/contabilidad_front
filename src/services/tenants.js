import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** GET /api/tenants — todos los tenants sin paginar */
export const getAllTenants = () => api.get('/tenants');

/** GET /api/tenants/paginated?page=1&limit=100 */
export const getTenantsPaginated = (page = 1, limit = 100) =>
  api.get('/tenants/paginated', { params: { page, limit } });

/** GET /api/tenants/:id */
export const getTenantById = (id) => api.get(`/tenants/${id}`);

/** POST /api/tenants */
export const createTenant = (data) => api.post('/tenants', data);

/** PUT /api/tenants/:id */
export const updateTenant = (id, data) => api.put(`/tenants/${id}`, data);

/** DELETE /api/tenants/:id — eliminacion logica (status = false) */
export const deleteTenant = (id) => api.delete(`/tenants/${id}`);
