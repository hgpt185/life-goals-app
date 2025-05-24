export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
} 