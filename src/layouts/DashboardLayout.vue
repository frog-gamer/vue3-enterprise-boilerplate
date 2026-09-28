<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Button from '@/components/ui/Button.vue';
import { ChevronDown } from 'lucide-vue-next';
import { menuService, type MenuNode } from '@/services/menu';

const auth = useAuthStore();
const router = useRouter();
const expandedMenus = ref<string[]>([]);
const menuItems = ref<MenuNode[]>([]);

async function loadMenu() {
  try {
    const items = await menuService.list();
    menuItems.value = items;
    const defaultExpanded = items.filter((item) => item.children && item.children.length > 0).map((item) => item.id);
    expandedMenus.value = defaultExpanded;
  } catch {
    menuItems.value = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '/' },
      {
        id: 'administration',
        label: 'Administration',
        icon: '⚙️',
        children: [
          { id: 'users', label: 'User Management', route: '/admin/users' },
          { id: 'roles', label: 'Roles & Permissions', route: '/admin/roles' },
          { id: 'audit', label: 'Audit Logs', route: '/admin/audit' },
        ],
      },
      {
        id: 'features',
        label: 'Features',
        icon: '✨',
        children: [
          { id: 'reports', label: 'Reports', route: '/features/reports' },
          { id: 'analytics', label: 'Analytics', route: '/features/analytics' },
        ],
      },
      { id: 'settings', label: 'Settings', icon: '⚡', route: '/settings' },
    ];
    expandedMenus.value = ['administration', 'features'];
  }
}

function toggleMenu(id: string) {
  const index = expandedMenus.value.indexOf(id);
  if (index > -1) {
    expandedMenus.value.splice(index, 1);
  } else {
    expandedMenus.value.push(id);
  }
}

function isMenuExpanded(id: string) {
  return expandedMenus.value.includes(id);
}

async function logout() {
  auth.logout();
  await router.push({ name: 'login' });
}

onMounted(() => {
  void loadMenu();
});
</script>

<template>
  <div class="flex min-h-screen flex-col md:flex-row bg-slate-950 text-slate-100">
    <aside class="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/90">
      <div class="flex items-center gap-3 border-b border-slate-800 p-4">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">EV</div>
        <div>
          <div class="font-semibold text-sm">Enterprise Vue</div>
          <div class="text-xs text-slate-400">v0.2.0</div>
        </div>
      </div>

      <nav class="flex-1 space-y-1 p-4" aria-label="Main navigation">
        <template v-for="item in menuItems" :key="item.id">
          <div v-if="item.children && item.children.length > 0">
            <button
              :aria-expanded="isMenuExpanded(item.id)"
              class="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/80 hover:text-slate-100 transition-colors"
              @click="toggleMenu(item.id)"
            >
              <span class="flex items-center gap-3 flex-1">
                <span class="text-base">{{ item.icon }}</span>
                <span>{{ item.label }}</span>
              </span>
              <ChevronDown
                :class="[
                  'h-4 w-4 transition-transform',
                  isMenuExpanded(item.id) && 'rotate-180',
                ]"
              />
            </button>
            <div v-if="isMenuExpanded(item.id)" class="ml-6 mt-1 space-y-1 border-l border-slate-700 pl-3">
              <RouterLink
                v-for="child in item.children"
                :key="child.id"
                :to="child.route || '#'"
                class="block rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-slate-800/60 hover:text-slate-100 transition-colors"
                active-class="bg-blue-600/20 text-blue-300 font-medium"
              >
                {{ child.label }}
              </RouterLink>
            </div>
          </div>

          <RouterLink
            v-else
            :to="item.route || '#'"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/80 hover:text-slate-100 transition-colors"
            active-class="bg-blue-600/20 text-blue-300"
          >
            <span class="text-base">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </RouterLink>
        </template>
      </nav>

      <div class="border-t border-slate-800 p-4">
        <div class="rounded-lg bg-slate-950/60 border border-slate-800 p-3 mb-3">
          <p class="text-sm font-medium truncate">{{ auth.user?.name }}</p>
          <p class="text-xs text-slate-400">{{ auth.user?.role }}</p>
        </div>
        <Button variant="secondary" class="w-full" @click="logout">Sign out</Button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-40 px-6 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-semibold">Enterprise Dashboard</h1>
          <div class="text-sm text-slate-400">
            {{ new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
          </div>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgb(71 85 105);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(100 116 139);
}
</style>
