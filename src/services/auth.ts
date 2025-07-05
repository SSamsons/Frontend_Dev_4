import axios from 'axios';

const API_URL = 'https://example.com/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
}; 