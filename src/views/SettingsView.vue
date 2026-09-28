<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';

const settings = ref([
  { label: 'Multi-factor authentication', description: 'Add an extra layer of security', enabled: true },
  { label: 'Audit logging', description: 'Track all system activities', enabled: true },
  { label: 'Auto scaling', description: 'Automatically scale resources', enabled: false },
  { label: 'Proactive alerts', description: 'Get notified of issues before they become problems', enabled: true },
]);

function toggleSetting(index: number) {
  settings.value[index].enabled = !settings.value[index].enabled;
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div>
      <p class="text-sm text-slate-400">Configuration</p>
      <h1 class="text-3xl font-bold tracking-tight">Application Settings</h1>
    </div>

    <!-- Security Settings -->
    <Card class="p-6">
      <h2 class="mb-6 text-lg font-semibold">Security & Features</h2>
      <div class="space-y-4">
        <div v-for="(setting, index) in settings" :key="setting.label" class="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 p-4 hover:bg-slate-950/60 transition-colors">
          <div>
            <h3 class="font-medium">{{ setting.label }}</h3>
            <p class="mt-1 text-sm text-slate-400">{{ setting.description }}</p>
          </div>
          <Button
            :variant="setting.enabled ? 'default' : 'secondary'"
            size="sm"
            @click="toggleSetting(index)"
          >
            {{ setting.enabled ? 'Enabled' : 'Disabled' }}
          </Button>
        </div>
      </div>
    </Card>

    <!-- Danger Zone -->
    <Card class="border-red-500/30 bg-red-500/5 p-6">
      <h2 class="mb-4 text-lg font-semibold text-red-300">Danger Zone</h2>
      <p class="text-sm text-slate-300 mb-4">These actions are irreversible. Please proceed with caution.</p>
      <Button variant="destructive">Delete All Data</Button>
    </Card>
  </div>
</template>
