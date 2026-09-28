import { apiGet } from '@/services/api';

export type MenuNode = {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  children?: MenuNode[];
};

export const menuService = {
  list: () => apiGet<MenuNode[]>('/menu'),
};
