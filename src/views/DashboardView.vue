<script setup lang="ts">
import { onMounted } from 'vue';
import { useAppStore } from '@/stores/app';
import { useAsync } from '@/composables/useAsync';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const store = useAppStore();
const { isLoading, error, errorMessage, execute } = useAsync(() => store.fetchStatus());

onMounted(() => {
  void execute();
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm text-slate-400">Overview</p>
        <h1 class="text-3xl font-bold tracking-tight">{{ store.appName }}</h1>
      </div>
      <div class="flex items-center gap-3">
        <span class="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          {{ store.status }}
        </span>
        <Button>Export Report</Button>
      </div>
    </div>

    <div v-if="isLoading" class="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-slate-300">Loading dashboard...</div>
    <div v-else-if="error" class="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300">{{ errorMessage }}</div>

    <div v-else class="grid gap-4 md:grid-cols-3">
      <Card v-for="metric in store.metrics" :key="metric.label" class="p-5">
        <p class="text-sm text-slate-400">{{ metric.label }}</p>
        <div class="mt-3 text-3xl font-bold">{{ metric.value }}</div>
        <div class="mt-2 text-xs" :class="metric.tone === 'success' ? 'text-emerald-300' : 'text-slate-300'">
          {{ metric.trend }}
        </div>
      </Card>
    </div>

    <Card class="p-5">
      <h2 class="mb-2 text-xl font-semibold">Account Summary</h2>
      <p class="text-slate-300">
        {{ store.user.name }} • {{ store.user.role }} • {{ store.user.department }}
      </p>
    </Card>
  </div>
</template>
