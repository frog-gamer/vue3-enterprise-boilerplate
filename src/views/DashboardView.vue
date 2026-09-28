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
    <!-- Page Header -->
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm text-slate-400">Welcome back</p>
        <h1 class="text-3xl font-bold tracking-tight">{{ store.appName }}</h1>
      </div>
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <span class="h-2 w-2 rounded-full bg-emerald-400" />
          {{ store.status }}
        </span>
        <Button>Export Report</Button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="rounded-lg border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-400">
      Loading dashboard...
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {{ errorMessage }}
    </div>

    <!-- Metrics Grid -->
    <div v-else class="grid gap-4 md:grid-cols-3">
      <Card v-for="metric in store.metrics" :key="metric.label" class="p-6">
        <p class="text-sm text-slate-400">{{ metric.label }}</p>
        <div class="mt-4 text-4xl font-bold">{{ metric.value }}</div>
        <div
          :class="[
            'mt-3 text-xs font-medium',
            metric.tone === 'success' ? 'text-emerald-300' : 'text-slate-400',
          ]"
        >
          {{ metric.trend }}
        </div>
      </Card>
    </div>

    <!-- Account Summary Card -->
    <Card class="p-6">
      <h2 class="mb-4 text-lg font-semibold">Account Summary</h2>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm text-slate-400">Full Name</span>
          <span class="font-medium">{{ store.user.name }}</span>
        </div>
        <div class="flex items-center justify-between border-t border-slate-800 pt-3">
          <span class="text-sm text-slate-400">Position</span>
          <span class="font-medium">{{ store.user.role }}</span>
        </div>
        <div class="flex items-center justify-between border-t border-slate-800 pt-3">
          <span class="text-sm text-slate-400">Department</span>
          <span class="font-medium">{{ store.user.department }}</span>
        </div>
      </div>
    </Card>
  </div>
</template>
