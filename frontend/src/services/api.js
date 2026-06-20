import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (d) => API.post('/auth/register', d),
  login: (d) => API.post('/auth/login', d),
  getMe: () => API.get('/auth/me'),
};

export const applicationAPI = {
  getAll: () => API.get('/applications'),
  create: (d) => API.post('/applications', d),
  update: (id, d) => API.put(`/applications/${id}`, d),
  delete: (id) => API.delete(`/applications/${id}`),
};

export const dashboardAPI = { getStats: () => API.get('/dashboard/stats') };
export const resumeAPI = { analyze: (d) => API.post('/resume/analyze', d) };

export default API;
