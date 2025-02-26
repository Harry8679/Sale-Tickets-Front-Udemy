import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Utilisation correcte pour Create React App
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;