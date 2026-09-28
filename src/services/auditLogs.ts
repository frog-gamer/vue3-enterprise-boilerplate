import { apiGet } from '@/services/api';

export type AuditLogStatus = 'success' | 'failure';

export type AuditLog = {
  id?: string;
  user: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  timestamp: string;
  status: AuditLogStatus;
};

export const auditLogService = {
  list: () => apiGet<AuditLog[]>('/auditLogs'),
  get: (id: string) => apiGet<AuditLog>(`/auditLogs/${id}`),
};
