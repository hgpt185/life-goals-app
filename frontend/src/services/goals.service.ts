import api from './api';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  completed: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type CreateGoalRequest = Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'userId'>;
export type UpdateGoalRequest = Partial<CreateGoalRequest>;

const GoalsService = {
  async getAll(): Promise<Goal[]> {
    const response = await api.get<Goal[]>('/api/goals');
    return response.data;
  },

  async create(goal: CreateGoalRequest): Promise<Goal> {
    const response = await api.post<Goal>('/api/goals', goal);
    return response.data;
  },

  async update(id: string, goal: UpdateGoalRequest): Promise<Goal> {
    const response = await api.put<Goal>(`/api/goals/${id}`, goal);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/goals/${id}`);
  },
};

export default GoalsService; 