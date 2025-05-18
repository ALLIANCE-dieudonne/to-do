import { create } from 'zustand';
import axios from 'axios';
import { Task, TaskFilters } from '../types';
import { API_URL } from '../config';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  currentTask: Task | null;
  filters: TaskFilters;
  fetchTasks: () => Promise<void>;
  fetchAllTasks: () => Promise<void>; // For admin
  createTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setCurrentTask: (task: Task | null) => void;
  setFilters: (filters: TaskFilters) => void;
  clearError: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  currentTask: null,
  filters: {},

  fetchTasks: async () => {
    try {
      set({ isLoading: true, error: null });
      const { filters } = get();
      const response = await axios.get<Task[]>(`${API_URL}/tasks`, {
        params: filters
      });
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      const message = axios.isAxiosError(error) 
        ? error.response?.data.message || 'Failed to fetch tasks' 
        : 'Failed to fetch tasks';
      set({ error: message, isLoading: false });
    }
  },

  fetchAllTasks: async () => {
    try {
      set({ isLoading: true, error: null });
      const { filters } = get();
      const response = await axios.get<Task[]>(`${API_URL}/tasks/all`, {
        params: filters
      });
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      const message = axios.isAxiosError(error) 
        ? error.response?.data.message || 'Failed to fetch all tasks' 
        : 'Failed to fetch all tasks';
      set({ error: message, isLoading: false });
    }
  },

  createTask: async (task) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post<Task>(`${API_URL}/tasks`, task);
      set((state) => ({ 
        tasks: [...state.tasks, response.data],
        isLoading: false 
      }));
    } catch (error) {
      const message = axios.isAxiosError(error) 
        ? error.response?.data.message || 'Failed to create task' 
        : 'Failed to create task';
      set({ error: message, isLoading: false });
    }
  },

  updateTask: async (id, task) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, task);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? response.data : t)),
        isLoading: false
      }));
    } catch (error) {
      const message = axios.isAxiosError(error) 
        ? error.response?.data.message || 'Failed to update task' 
        : 'Failed to update task';
      set({ error: message, isLoading: false });
    }
  },

  deleteTask: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await axios.delete(`${API_URL}/tasks/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        isLoading: false
      }));
    } catch (error) {
      const message = axios.isAxiosError(error) 
        ? error.response?.data.message || 'Failed to delete task' 
        : 'Failed to delete task';
      set({ error: message, isLoading: false });
    }
  },

  setCurrentTask: (task) => set({ currentTask: task }),
  
  setFilters: (filters) => set({ filters }),
  
  clearError: () => set({ error: null })
}));