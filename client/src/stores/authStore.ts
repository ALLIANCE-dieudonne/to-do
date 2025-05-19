import { create } from 'zustand';
import axios from 'axios';
import { User, LoginCredentials, RegisterData, AuthResponse } from '../types';
import { API_URL } from '../config';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post<AuthResponse>(
        `${API_URL}/user/login`,
        credentials,
        { withCredentials: true }
      );
      
      const { user, token } = response.data.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const message = axios.isAxiosError(error) 
        ? error.response?.data.message || 'Login failed' 
        : 'Login failed';
      set({ error: message, isLoading: false });
    }
  },

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post<AuthResponse>(
        `${API_URL}/user/create`,
        data
      );
      

      const { user, token } = response.data?.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      const message = axios.isAxiosError(error) 
        ? error.response?.data.message || 'Registration failed' 
        : 'Registration failed';
      set({ error: message, isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      set({ isLoading: true });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get<{data:User}>(`${API_URL}/user/me`, {
        withCredentials: true
      });
      set({ user: response.data.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));