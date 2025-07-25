// Création d'une instance axios avec l'URL de base de l'API
// Avant chaque requête, on ajoute le token JWT dans le header Authorization si présent
// Ça permet d'envoyer automatiquement le token pour l'authentification backend
// En cas d'erreur de requête, on rejette la promesse pour la gérer ailleurs
// Ce fichier facilite toutes les requêtes API avec authentification automatique

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
