<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const router = useRouter();

async function logout() {
  auth.logout();
  await router.push({ name: 'login' });
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="flex min-h-screen flex-col md:flex-row">
      <aside class="w-full border-b border-slate-800 bg-slate-900/80 md:w-64 md:border-b-0 md:border-r">
        <div class="flex items-center gap-3 border-b border-slate-800 p-4">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">EV</div>
          <div><div class="font-semibold">Enterprise Vue</div><div class="text-xs text-slate-400">Starter</div></div>
        </div>
        <nav class="space-y-2 p-4" aria-label="Main navigation">
          <RouterLink class="nav-link" to="/">Dashboard</RouterLink>
          <RouterLink class="nav-link" to="/admin/users">User Management</RouterLink>
          <RouterLink class="nav-link" to="/settings">Settings</RouterLink>
        </nav>
        <div class="m-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300">
          <div>{{ auth.user?.name }}</div>
          <div class="mt-1 text-xs text-slate-500">{{ auth.user?.role }}</div>
          <button class="mt-3 text-xs text-blue-300 hover:text-blue-200" @click="logout">Sign out</button>
        </div>
      </aside>
      <main class="flex-1 p-4 md:p-8"><RouterView /></main>
    </div>
  </div>
</template>

<style scoped>
.nav-link { display: block; border-radius: 0.75rem; padding: 0.7rem 0.9rem; color: rgb(148 163 184); text-decoration: none; }
.nav-link:hover, .nav-link.router-link-active { background: rgba(59, 130, 246, 0.12); color: white; }
</style>
