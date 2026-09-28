import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { apiClearToken, apiSetToken } from '@/services/api';

export type AuthUser = {
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'User';
};

const STORAGE_KEY = 'enterprise_auth_user';
const DEMO_CREDENTIALS = { email: 'admin@example.com', password: 'password' };

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(readStoredUser());
  const isAuthenticated = computed(() => user.value !== null);

  async function login(email: string, password: string): Promise<void> {
    if (email !== DEMO_CREDENTIALS.email || password !== DEMO_CREDENTIALS.password) {
      throw new Error('Email atau password tidak valid.');
    }

    user.value = { name: 'Demo Administrator', email, role: 'Admin' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value));
    apiSetToken('demo-access-token');
  }

  function logout(): void {
    user.value = null;
    localStorage.removeItem(STORAGE_KEY);
    apiClearToken();
  }

  return { user, isAuthenticated, login, logout };
});

function readStoredUser(): AuthUser | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
