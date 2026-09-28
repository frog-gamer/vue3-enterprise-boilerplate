<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from '@/components/ui/Card.vue';
import { analyticsService, type Analytics } from '@/services/analytics';

const analytics = ref<Analytics[]>([]);
const isLoading = ref(false);
const error = ref('');

async function loadAnalytics() {
  isLoading.value = true;
  error.value = '';
  try {
    analytics.value = await analyticsService.list();
  } catch {
    error.value = 'Tidak dapat memuat analytics.';
  } finally {
    isLoading.value = false;
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

onMounted(() => {
  void loadAnalytics();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <p class="text-sm text-slate-400">Data Insights</p>
      <h1 class="text-3xl font-bold tracking-tight">Analytics</h1>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {{ error }}
    </div>

    <!-- Analytics Cards -->
    <div v-if="isLoading" class="text-center text-slate-400">Loading analytics...</div>
    <div v-else class="space-y-4">
      <Card v-for="data in analytics" :key="data.id" class="p-6">
        <div class="mb-6 border-b border-slate-800 pb-4">
          <h3 class="text-lg font-semibold">{{ formatDate(data.date) }}</h3>
        </div>
        <div class="grid gap-4 md:grid-cols-4">
          <div>
            <p class="text-sm text-slate-400">Active Users</p>
            <p class="mt-2 text-2xl font-bold">{{ data.activeUsers }}</p>
          </div>
          <div>
            <p class="text-sm text-slate-400">New Users</p>
            <p class="mt-2 text-2xl font-bold text-emerald-300">+{{ data.newUsers }}</p>
          </div>
          <div>
            <p class="text-sm text-slate-400">Avg Session Duration</p>
            <p class="mt-2 text-2xl font-bold">{{ data.sessionDuration }}m</p>
          </div>
          <div>
            <p class="text-sm text-slate-400">Bounce Rate</p>
            <p class="mt-2 text-2xl font-bold">{{ data.bounceRate }}%</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
