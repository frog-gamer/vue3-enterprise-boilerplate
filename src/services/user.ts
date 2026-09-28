import { apiGet, apiPost, apiPut, apiDelete } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Developer' | 'Viewer';
  status: 'Active' | 'Pending' | 'Inactive';
  department: string;
  phone: string;
  joinDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  status?: string;
  role?: string;
  search?: string;
}

export const userService = {
  /**
   * Get list of users with filters
   */
  list: async (filters: UserFilters = {}): Promise<User[]> => {
    const params = new URLSearchParams();

    if (filters.page) params.append('_page', String(filters.page));
    if (filters.limit) params.append('_limit', String(filters.limit));
    if (filters.status) params.append('status_like', filters.status);
    if (filters.role) params.append('role_like', filters.role);
    if (filters.search) params.append('q', filters.search);

    const query = params.toString();
    const endpoint = `/users${query ? `?${query}` : ''}`;
    
    return apiGet<User[]>(endpoint);
  },

  /**
   * Get single user by ID
   */
  get: async (id: string): Promise<User> => {
    return apiGet<User>(`/users/${id}`);
  },

  /**
   * Create new user
   */
  create: async (payload: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    return apiPost<User>('/users', {
      ...payload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  },

  /**
   * Update existing user
   */
  update: async (id: string, payload: Partial<User>): Promise<User> => {
    return apiPut<User>(`/users/${id}`, {
      ...payload,
      updatedAt: new Date().toISOString(),
    });
  },

  /**
   * Delete user
   */
  delete: async (id: string): Promise<void> => {
    return apiDelete(`/users/${id}`);
  },
};

export default userService;
