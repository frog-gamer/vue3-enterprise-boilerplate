<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();
const email = ref('admin@example.com');
const password = ref('password');
const error = ref('');
const isLoading = ref(false);

async function submit() {
  error.value = '';
  isLoading.value = true;
  try {
    await auth.login(email.value, password.value);
    await router.push({ name: 'dashboard' });
  } catch (loginError) {
    error.value = loginError instanceof Error ? loginError.message : 'Login gagal.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Card -->
      <Card class="p-8">
        <!-- Header -->
        <div class="mb-8 text-center">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white text-2xl shadow-lg shadow-blue-500/50">
            EV
          </div>
          <h1 class="text-3xl font-bold mb-2">Sign in</h1>
          <p class="text-sm text-slate-400">Masuk ke Enterprise Vue Starter</p>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="submit">
          <!-- Email Input -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300" for="email">Email Address</label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="admin@example.com"
              autocomplete="email"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300" for="password">Password</label>
            <Input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-300">
            {{ error }}
          </div>

          <!-- Submit Button -->
          <Button class="w-full h-11 text-base" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Signing in...' : 'Sign in' }}
          </Button>
        </form>

        <!-- Divider -->
        <div class="my-6 flex items-center gap-3">
          <div class="flex-1 border-t border-slate-700" />
          <span class="text-xs text-slate-500">Demo Credentials</span>
          <div class="flex-1 border-t border-slate-700" />
        </div>

        <!-- Demo Credentials -->
        <div class="space-y-2 rounded-lg bg-slate-900/50 border border-slate-800 p-4">
          <div class="text-xs text-slate-400">
            <span class="font-medium text-slate-300">Email:</span> admin@example.com
          </div>
          <div class="text-xs text-slate-400">
            <span class="font-medium text-slate-300">Password:</span> password
          </div>
        </div>
      </Card>

      <!-- Footer -->
      <p class="mt-6 text-center text-xs text-slate-500">
        © 2024 Enterprise Vue Starter. All rights reserved.
      </p>
    </div>
  </div>
</template>
