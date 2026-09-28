<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import { reportService, type Report } from '@/services/reports';

const reports = ref<Report[]>([]);
const isLoading = ref(false);
const error = ref('');

async function loadReports() {
  isLoading.value = true;
  error.value = '';
  try {
    reports.value = await reportService.list();
  } catch {
    error.value = 'Tidak dapat memuat reports.';
  } finally {
    isLoading.value = false;
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function downloadReport(report: Report) {
  window.location.href = report.downloadUrl || '#';
}

onMounted(() => {
  void loadReports();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm text-slate-400">Documentation</p>
        <h1 class="text-3xl font-bold tracking-tight">Reports</h1>
      </div>
      <Button>Generate Report</Button>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {{ error }}
    </div>

    <!-- Reports List -->
    <div v-if="isLoading" class="text-center text-slate-400">Loading reports...</div>
    <div v-else class="space-y-4">
      <Card v-for="report in reports" :key="report.id" class="p-6">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h3 class="text-lg font-semibold">{{ report.title }}</h3>
              <span
                :class="[
                  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                  report.type === 'sales' && 'bg-blue-500/15 text-blue-300',
                  report.type === 'activity' && 'bg-purple-500/15 text-purple-300',
                  report.type === 'security' && 'bg-red-500/15 text-red-300',
                ]"
              >
                {{ report.type }}
              </span>
            </div>
            <p class="mt-2 text-sm text-slate-400">{{ report.description }}</p>
            <div class="mt-4 flex items-center gap-6 text-xs text-slate-500">
              <span>By {{ report.author }}</span>
              <span>{{ formatDate(report.createdAt) }}</span>
            </div>
          </div>
          <Button v-if="report.status === 'completed'" @click="downloadReport(report)">Download</Button>
          <span v-else class="inline-flex items-center rounded-full bg-amber-500/15 px-3 py-2 text-xs font-medium text-amber-300">
            Pending
          </span>
        </div>
      </Card>
    </div>
  </div>
</template>
