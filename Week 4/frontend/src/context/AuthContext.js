import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);
  const [username, setUsername] = useState(sessionStorage.getItem('username') || 'Guest');

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('username');
    if (storedToken) setToken(storedToken);
    if (storedUser) setUsername(storedUser);
  }, []);

  const login = (token, username) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('username', username);
    setToken(token);
    setUsername(username);
  };

  const logout = () => {
    sessionStorage.clear();
    setToken(null);
    setUsername('Guest');
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
