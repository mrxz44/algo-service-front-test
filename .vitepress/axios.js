// .vitepress/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: 'https://algo-service-backend-production.up.railway.app/',
});

export default api;
