<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, type InputHTMLAttributes } from 'vue';

interface InputProps extends InputHTMLAttributes {}
const props = defineProps<InputProps>();
const inputClass = computed(() =>
  cn(
    'flex h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
    props.class
  )
);
</script>

<template>
  <input v-bind="$attrs" :class="inputClass" />
</template>
