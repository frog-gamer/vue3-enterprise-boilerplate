<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, type HTMLAttributes } from 'vue';

interface CardProps extends HTMLAttributes {}
const props = defineProps<CardProps>();
const cardClass = computed(() => cn('rounded-xl border border-slate-800 bg-slate-900/80 text-slate-100 shadow-lg shadow-slate-950/20', props.class));
</script>

<template>
  <div :class="cardClass">
    <slot />
  </div>
</template>
