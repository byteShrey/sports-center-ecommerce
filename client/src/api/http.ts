import axios from 'axios';
import { authStorage } from '../utils/authStorage';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
});

http.interceptors.request.use((config) => {
  const user = authStorage.get();
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
