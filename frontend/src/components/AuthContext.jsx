// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      setUser({ username: payload.username, role: payload.role });
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', 'mock-token'); // Simulate token storage
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    setUserFromToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser: login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
