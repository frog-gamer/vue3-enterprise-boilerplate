<script setup lang="ts">
import { onMounted } from 'vue';
import AppError from '@/components/ui/AppError.vue';
import AppLoading from '@/components/ui/AppLoading.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import MetricCard from '@/components/dashboard/MetricCard.vue';
import { useAppStore } from '@/stores/app';
import { useAsync } from '@/composables/useAsync';

const store = useAppStore();
const { error, errorMessage, isLoading, execute } = useAsync(() => store.fetchStatus());

onMounted(() => {
  void execute();
});
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <p class="muted">Overview</p>
        <h1>{{ store.appName }}</h1>
      </div>
      <div class="header-actions">
        <span class="pill">{{ store.status }}</span>
        <BaseButton>Export report</BaseButton>
      </div>
    </header>

    <AppLoading v-if="isLoading" label="Memuat status aplikasi..." />
    <AppError v-else-if="error" title="Gagal memuat status" :message="errorMessage" @retry="execute" />

    <section v-else class="grid">
      <MetricCard v-for="metric in store.metrics" :key="metric.label" v-bind="metric" />
    </section>

    <BaseCard title="Account Summary" style="margin-top: 1.5rem">
      <p>
        {{ store.user.name }} • {{ store.user.role }} • {{ store.user.department }}
      </p>
    </BaseCard>
  </div>
</template>
