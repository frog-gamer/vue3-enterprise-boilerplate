<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const settings = ref([
  { label: 'Multi-factor authentication', enabled: true },
  { label: 'Audit logging', enabled: true },
  { label: 'Auto scaling', enabled: false },
  { label: 'Proactive alerts', enabled: true },
]);

function toggleSetting(index: number) {
  settings.value[index].enabled = !settings.value[index].enabled;
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <p class="text-sm text-slate-400">Configuration</p>
      <h1 class="text-3xl font-bold tracking-tight">Application settings</h1>
    </div>

    <Card class="p-4 md:p-6">
      <div class="space-y-3">
        <div v-for="(setting, index) in settings" :key="setting.label" class="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <div>
            <div class="font-medium">{{ setting.label }}</div>
          </div>
          <Button
            :variant="setting.enabled ? 'default' : 'secondary'"
            size="sm"
            @click="toggleSetting(index)"
          >
            {{ setting.enabled ? 'On' : 'Off' }}
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>
