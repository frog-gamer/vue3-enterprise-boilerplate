import { describe, expect, it, beforeEach } from 'vitest';
import { useAuthStore } from '@/stores/auth';
import { createPinia, setActivePinia } from 'pinia';

describe('auth store', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('logs in with demo credentials', async () => {
    const auth = useAuthStore();
    await auth.login('admin@example.com', 'password');
    expect(auth.isAuthenticated).toBe(true);
    expect(auth.user?.role).toBe('Admin');
  });

  it('rejects invalid credentials', async () => {
    const auth = useAuthStore();
    await expect(auth.login('wrong@example.com', 'wrong')).rejects.toThrow();
    expect(auth.isAuthenticated).toBe(false);
  });
});
