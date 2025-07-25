
// AuthContext gère l'authentification globale de l'app
// Fournit user, token, login et logout à toute l'application
// login fait la requête API, sauvegarde token et user localement
// logout supprime tout et nettoie localStorage
// fetchUser récupère les infos user avec le token stocké
// useEffect recharge user quand le token change
// useAuth est un hook pour utiliser facilement ce contexte

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  const fetchUser = async () => {
    if (token) {
      try {
        const res = await api.get('/me');
        setUser(res.data);
      } catch {
        logout();
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
