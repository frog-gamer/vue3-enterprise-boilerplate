<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from '@/components/ui/Card.vue';
import { auditLogService, type AuditLog } from '@/services/auditLogs';

const auditLogs = ref<AuditLog[]>([]);
const isLoading = ref(false);
const error = ref('');

async function loadAuditLogs() {
  isLoading.value = true;
  error.value = '';
  try {
    auditLogs.value = await auditLogService.list();
  } catch {
    error.value = 'Tidak dapat memuat audit logs.';
  } finally {
    isLoading.value = false;
  }
}

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

onMounted(() => {
  void loadAuditLogs();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <p class="text-sm text-slate-400">System Activity</p>
      <h1 class="text-3xl font-bold tracking-tight">Audit Logs</h1>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {{ error }}
    </div>

    <!-- Audit Logs Table -->
    <Card>
      <div v-if="isLoading" class="p-8 text-center text-slate-400">Loading audit logs...</div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-slate-800 bg-slate-950/50 text-slate-300">
            <tr>
              <th class="px-6 py-4 font-semibold">User</th>
              <th class="px-6 py-4 font-semibold">Action</th>
              <th class="px-6 py-4 font-semibold">Resource</th>
              <th class="px-6 py-4 font-semibold">Details</th>
              <th class="px-6 py-4 font-semibold">Timestamp</th>
              <th class="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in auditLogs" :key="log.id" class="border-b border-slate-800/50 hover:bg-slate-900/40 transition-colors">
              <td class="px-6 py-4 font-medium">{{ log.user }}</td>
              <td class="px-6 py-4 text-slate-300">{{ log.action }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                  {{ log.resource }}
                </span>
              </td>
              <td class="px-6 py-4 text-slate-300 max-w-xs truncate">{{ log.details }}</td>
              <td class="px-6 py-4 text-slate-300">{{ formatDate(log.timestamp) }}</td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                    log.status === 'success' && 'bg-emerald-500/15 text-emerald-300',
                    log.status === 'failure' && 'bg-red-500/15 text-red-300',
                  ]"
                >
                  {{ log.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>
