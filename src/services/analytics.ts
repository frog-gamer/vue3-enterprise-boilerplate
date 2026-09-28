import { apiGet } from '@/services/api';

export type Analytics = {
  id?: string;
  date: string;
  activeUsers: number;
  newUsers: number;
  sessionDuration: string;
  bounceRate: string;
};

export const analyticsService = {
  list: () => apiGet<Analytics[]>('/analytics'),
  getByDate: (date: string) => apiGet<Analytics>(`/analytics?date=${date}`),
};
