import axios from 'axios';
import { AuthResponse, Goal, User } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Request URL:', config.url);
  console.log('Token from localStorage:', token ? 'Present' : 'Not present');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set');
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });

    // Only handle auth errors for non-auth endpoints
    if (error.response?.status === 401 &&
        !error.config.url.includes('/api/auth/')) {
      console.log('401 error on protected endpoint, logging out');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      console.error('403 Forbidden - user is authenticated but not authorized');
      // Don't log out on 403, just show error
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/api/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/api/auth/register', { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// User APIs
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/api/users/me');
  return response.data;
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  const response = await api.put('/api/users/me', userData);
  return response.data;
};

// Goals APIs
export const getGoals = async (): Promise<Goal[]> => {
  const response = await api.get('/api/goals');
  return response.data;
};

export const createGoal = async (goal: Pick<Goal, 'title' | 'description' | 'completed'>): Promise<Goal> => {
  console.log('Creating goal:', goal);
  try {
    const response = await api.post('/api/goals', goal);
    console.log('Goal created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create goal:', error);
    throw error;
  }
};

export const updateGoal = async (id: string, goal: Partial<Goal>): Promise<Goal> => {
  try {
    const response = await api.put(`/api/goals/${id}`, goal);
    return response.data;
  } catch (error) {
    console.error('Error in updateGoal:', error);
    throw error;
  }
};

export const deleteGoal = async (id: string): Promise<void> => {
  await api.delete(`/api/goals/${id}`);
};

export default api; 