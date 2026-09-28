import { apiDelete, apiGet, apiPost, apiPut } from '@/services/api';

export type UserStatus = 'Active' | 'Pending' | 'Inactive';

export type User = {
  id?: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  department?: string;
  phone?: string;
  joinDate?: string;
};

export type UserPayload = Omit<User, 'id'>;

export const userService = {
  list: () => apiGet<User[]>('/users'),
  create: (payload: UserPayload) => apiPost<User>('/users', payload),
  update: (id: string, payload: UserPayload) => apiPut<User>(`/users/${id}`, payload),
  remove: (id: string) => apiDelete<void>(`/users/${id}`),
};
