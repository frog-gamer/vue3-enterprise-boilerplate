import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import SettingsView from '@/views/SettingsView.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

// User Management
import UserListView from '@/views/users/UserListView.vue';
import UserDetailView from '@/views/users/UserDetailView.vue';
import UserCreateView from '@/views/users/UserCreateView.vue';

// Admin Pages
import AdminRolesView from '@/views/AdminRolesView.vue';
import AdminAuditView from '@/views/AdminAuditView.vue';

// Features Pages
import FeaturesReportsView from '@/views/FeaturesReportsView.vue';
import FeaturesAnalyticsView from '@/views/FeaturesAnalyticsView.vue';

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
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
        },
        // User Management Routes
        {
          path: 'users',
          name: 'user-list',
          component: UserListView,
        },
        {
          path: 'users/create',
          name: 'user-create',
          component: UserCreateView,
        },
        {
          path: 'users/:id',
          name: 'user-detail',
          component: UserDetailView,
        },
        // Admin Routes
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
        // Features Routes
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
        // Settings
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
