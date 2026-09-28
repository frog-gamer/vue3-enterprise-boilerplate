import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AdminUsersView from '@/views/AdminUsersView.vue';
import AdminRolesView from '@/views/AdminRolesView.vue';
import AdminAuditView from '@/views/AdminAuditView.vue';
import SettingsView from '@/views/SettingsView.vue';
import FeaturesReportsView from '@/views/FeaturesReportsView.vue';
import FeaturesAnalyticsView from '@/views/FeaturesAnalyticsView.vue';
import ProtectedLayout from '@/layouts/ProtectedLayout.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'public' },
    },
    {
      path: '/',
      component: ProtectedLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
        },
        {
          path: 'admin/users',
          name: 'admin-users',
          component: AdminUsersView,
        },
        {
          path: 'admin/roles',
          name: 'admin-roles',
          component: AdminRolesView,
        },
        {
          path: 'admin/audit',
          name: 'admin-audit',
          component: AdminAuditView,
        },
        {
          path: 'features/reports',
          name: 'features-reports',
          component: FeaturesReportsView,
        },
        {
          path: 'features/analytics',
          name: 'features-analytics',
          component: FeaturesAnalyticsView,
        },
        {
          path: 'settings',
          name: 'settings',
          component: SettingsView,
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' };
  }
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'dashboard' };
  }
  return true;
});

export default router;
