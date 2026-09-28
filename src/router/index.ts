import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import SettingsView from '@/views/SettingsView.vue';
import AdminUsersView from '@/views/AdminUsersView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/admin/users', name: 'admin-users', component: AdminUsersView },
    { path: '/settings', name: 'settings', component: SettingsView },
  ],
});

export default router;
