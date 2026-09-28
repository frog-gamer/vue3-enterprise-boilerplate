<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  loading: false,
});
</script>

<template>
  <button
    class="base-button"
    :class="`base-button--${variant}`"
    :type="type"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true" />
    <slot v-else />
  </button>
</template>
