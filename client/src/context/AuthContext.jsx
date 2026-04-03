import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get('/auth/me');
          setUser(data.data);
        } catch (error) {
          console.error('Failed to authenticate:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.data.token);
    setUser(data.data);
    return data;
  };

  const register = async (name, email, password, role = 'user', profileImage = null, stationDetails = null) => {
    // Note: profileImage excluded from registration to prevent payload timeout.
    // Users can update profile image after login from their dashboard.
    const payload = { name, email, password, role };
    if (stationDetails) {
      // Also strip base64 images from stationDetails to keep payload small
      const { images, ...stationMeta } = stationDetails;
      payload.stationDetails = stationMeta;
    }
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('token', data.data.token);
    setUser(data.data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
