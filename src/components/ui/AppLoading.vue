<script setup lang="ts">
defineProps<{
  label?: string;
}>();
</script>

<template>
  <div class="loading-state" role="status" aria-live="polite">
    <span class="loading-state__spinner" aria-hidden="true" />
    <span>{{ label ?? 'Loading...' }}</span>
  </div>
</template>
