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
  <main class="flex min-h-screen items-center justify-center bg-slate-950 p-4">
    <Card class="w-full max-w-md p-6">
      <div class="mb-6 text-center">
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold">EV</div>
        <h1 class="text-2xl font-bold">Sign in</h1>
        <p class="mt-1 text-sm text-slate-400">Masuk ke Enterprise Vue Starter</p>
      </div>

      <form class="space-y-4" @submit.prevent="submit">
        <div>
          <label class="mb-1 block text-sm text-slate-300" for="email">Email</label>
          <Input id="email" v-model="email" type="email" autocomplete="email" required />
        </div>
        <div>
          <label class="mb-1 block text-sm text-slate-300" for="password">Password</label>
          <Input id="password" v-model="password" type="password" autocomplete="current-password" required />
        </div>
        <p v-if="error" class="rounded-md bg-red-500/10 p-3 text-sm text-red-300">{{ error }}</p>
        <Button class="w-full" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </Button>
      </form>

      <p class="mt-5 text-center text-xs text-slate-500">Demo: admin@example.com / password</p>
    </Card>
  </main>
</template>
