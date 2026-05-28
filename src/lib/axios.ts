import axios from 'axios';
import { TMDB_BASE_URL } from '@/lib/constants';

const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_BASE_URL ?? TMDB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  config.params = {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
    ...config.params,
  };

  return config;
});

export default api;
