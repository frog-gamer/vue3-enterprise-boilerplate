<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue';

defineProps<{
  label: string;
  value: string;
  trend?: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
}>();
</script>

<template>
  <BaseCard class="metric-card">
    <p class="muted">{{ label }}</p>
    <div class="metric-card__value">{{ value }}</div>
    <small v-if="trend" :class="`metric-card__trend metric-card__trend--${tone ?? 'default'}`">
      {{ trend }}
    </small>
  </BaseCard>
</template>
