<script setup lang="ts">
defineProps<{
  title: string;
  message?: string;
}>();

defineEmits<{
  retry: [];
}>();
</script>

<template>
  <div class="error-state" role="alert">
    <strong>{{ title }}</strong>
    <p v-if="message">{{ message }}</p>
    <button type="button" class="error-state__retry" @click="$emit('retry')">
      Coba lagi
    </button>
  </div>
</template>
