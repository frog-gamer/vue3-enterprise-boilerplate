<script setup lang="ts">
defineProps<{
  title?: string;
  subtitle?: string;
}>();
</script>

<template>
  <section class="base-card">
    <header v-if="title || subtitle" class="base-card__header">
      <div>
        <h2 v-if="title">{{ title }}</h2>
        <p v-if="subtitle" class="muted">{{ subtitle }}</p>
      </div>
      <div><slot name="actions" /></div>
    </header>
    <div class="base-card__body"><slot /></div>
  </section>
</template>
