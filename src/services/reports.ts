import { apiGet } from '@/services/api';

export type Report = {
  id?: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  type: string;
  status: 'completed' | 'pending' | 'failed';
  downloadUrl?: string;
};

export const reportService = {
  list: () => apiGet<Report[]>('/reports'),
  get: (id: string) => apiGet<Report>(`/reports/${id}`),
};
