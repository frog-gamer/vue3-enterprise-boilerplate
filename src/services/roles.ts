import { apiGet } from '@/services/api';

export type Permission = 'create' | 'read' | 'update' | 'delete' | 'manage_users' | 'manage_roles' | 'manage_team' | 'report_issues';

export type Role = {
  id?: string;
  name: string;
  description: string;
  permissions: Permission[];
  userCount: number;
};

export const roleService = {
  list: () => apiGet<Role[]>('/roles'),
  get: (id: string) => apiGet<Role>(`/roles/${id}`),
};
