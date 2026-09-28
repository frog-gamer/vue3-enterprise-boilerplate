<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue';
import { useToggle } from '@/composables/useToggle';

const mfa = useToggle(true);
const auditLogging = useToggle(true);
const autoScaling = useToggle(false);
const proactiveAlerts = useToggle(true);

const settings = [
  { label: 'Multi-factor authentication', state: mfa },
  { label: 'Audit logging', state: auditLogging },
  { label: 'Auto scaling', state: autoScaling },
  { label: 'Proactive alerts', state: proactiveAlerts },
];
</script>

<template>
  <div class="page">
    <header class="page-header">
      <div>
        <p class="muted">Configuration</p>
        <h1>Application settings</h1>
      </div>
    </header>

    <BaseCard title="Enterprise controls" subtitle="Kelola fitur keamanan dan operasional aplikasi.">
      <div class="settings-list">
        <div v-for="setting in settings" :key="setting.label" class="switch-row">
          <strong>{{ setting.label }}</strong>
          <button
            :class="['switch', { active: setting.state.value }]"
            :aria-label="`Toggle ${setting.label}`"
            @click="setting.state.toggle"
          />
        </div>
      </div>
    </BaseCard>
  </div>
</template>
