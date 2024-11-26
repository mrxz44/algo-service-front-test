// .vitepress/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: 'https://algo-service-production.up.railway.app/',
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
