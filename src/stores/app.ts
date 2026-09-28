import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { apiGet } from '@/services/api';

export const useAppStore = defineStore('app', () => {
  const user = ref({
    name: 'Alicia Thompson',
    role: 'Platform Engineering Lead',
    department: 'Operations',
  });

  const metrics = ref([
    { label: 'Active Users', value: '24.8K', trend: '+12.4%', tone: 'success' as const },
    { label: 'Conversion', value: '8.6%', trend: '+2.1%', tone: 'success' as const },
    { label: 'System Uptime', value: '99.98%', trend: 'Stable', tone: 'default' as const },
  ]);

  const status = ref('Checking...');
  const appName = computed(() => 'Enterprise Vue 3 Starter');

  async function fetchStatus(): Promise<void> {
    try {
      const response = await apiGet<{ status?: string }>('/health');
      status.value = response.status ?? 'Healthy';
    } catch {
      status.value = 'Demo mode';
    }
  }

  return { user, metrics, status, appName, fetchStatus };
});
