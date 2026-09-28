<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import { roleService, type Role } from '@/services/roles';

const roles = ref<Role[]>([]);
const isLoading = ref(false);
const error = ref('');

async function loadRoles() {
  isLoading.value = true;
  error.value = '';
  try {
    roles.value = await roleService.list();
  } catch {
    error.value = 'Tidak dapat memuat roles. Pastikan mock API berjalan di port 3000.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  void loadRoles();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm text-slate-400">Access Control</p>
        <h1 class="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {{ error }}
    </div>

    <!-- Roles Grid -->
    <div v-if="isLoading" class="text-center text-slate-400">Loading roles...</div>
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="role in roles" :key="role.id" class="p-6">
        <div class="mb-4 flex items-start justify-between">
          <div>
            <h3 class="font-semibold text-lg">{{ role.name }}</h3>
            <p class="mt-1 text-sm text-slate-400">{{ role.description }}</p>
          </div>
          <span class="inline-flex items-center rounded-full bg-blue-500/15 px-2.5 py-1 text-xs font-medium text-blue-300">
            {{ role.userCount }} users
          </span>
        </div>

        <!-- Permissions -->
        <div class="mt-4 space-y-2 border-t border-slate-800 pt-4">
          <p class="text-xs font-medium text-slate-300">Permissions</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="permission in role.permissions"
              :key="permission"
              class="inline-flex items-center rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300"
            >
              {{ permission }}
            </span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
