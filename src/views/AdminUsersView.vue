<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import { userService, type User, type UserPayload, type UserStatus } from '@/services/users';

const users = ref<User[]>([]);
const isOpen = ref(false);
const isLoading = ref(false);
const isSaving = ref(false);
const error = ref('');
const editingId = ref<string | null>(null);
const form = ref<UserPayload>(emptyForm());

async function loadUsers() {
  isLoading.value = true;
  error.value = '';
  try {
    users.value = await userService.list();
  } catch {
    error.value = 'Tidak dapat memuat users. Pastikan mock API berjalan di port 3000.';
  } finally {
    isLoading.value = false;
  }
}

function emptyForm(): UserPayload {
  return { name: '', email: '', role: 'User', status: 'Active' };
}

function openCreate() {
  editingId.value = null;
  form.value = emptyForm();
  isOpen.value = true;
}

function openEdit(user: User) {
  editingId.value = user.id ?? null;
  form.value = {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

async function saveUser() {
  if (!form.value.name || !form.value.email) return;
  isSaving.value = true;
  try {
    const saved = editingId.value
      ? await userService.update(editingId.value, form.value)
      : await userService.create(form.value);
    if (editingId.value) {
      users.value = users.value.map((user) => (user.id === saved.id ? saved : user));
    } else {
      users.value.unshift(saved);
    }
    closeModal();
  } catch {
    error.value = 'User gagal disimpan.';
  } finally {
    isSaving.value = false;
  }
}

async function removeUser(id?: string) {
  if (!id || !window.confirm('Hapus user ini?')) return;
  try {
    await userService.remove(id);
    users.value = users.value.filter((user) => user.id !== id);
  } catch {
    error.value = 'User gagal dihapus.';
  }
}

onMounted(() => {
  void loadUsers();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm text-slate-400">System Management</p>
        <h1 class="text-3xl font-bold tracking-tight">User Management</h1>
      </div>
      <Button @click="openCreate">+ Add User</Button>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
      {{ error }}
    </div>

    <!-- Users Table Card -->
    <Card>
      <div v-if="isLoading" class="p-8 text-center text-slate-400">Loading users...</div>
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-slate-800 bg-slate-950/50 text-slate-300">
            <tr>
              <th class="px-6 py-4 font-semibold">Name</th>
              <th class="px-6 py-4 font-semibold">Email</th>
              <th class="px-6 py-4 font-semibold">Role</th>
              <th class="px-6 py-4 font-semibold">Status</th>
              <th class="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b border-slate-800/50 hover:bg-slate-900/40 transition-colors">
              <td class="px-6 py-4 font-medium">{{ user.name }}</td>
              <td class="px-6 py-4 text-slate-300">{{ user.email }}</td>
              <td class="px-6 py-4 text-slate-300">
                <span class="inline-flex items-center rounded-full bg-blue-500/15 px-2.5 py-1 text-xs font-medium text-blue-300">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
                    user.status === 'Active' && 'bg-emerald-500/15 text-emerald-300',
                    user.status === 'Pending' && 'bg-amber-500/15 text-amber-300',
                    user.status === 'Inactive' && 'bg-red-500/15 text-red-300',
                  ]"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="space-x-2 px-6 py-4 text-right">
                <Button variant="ghost" size="sm" @click="openEdit(user)">Edit</Button>
                <Button variant="ghost" size="sm" @click="removeUser(user.id)">Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Add/Edit User Modal -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <Card class="w-full max-w-lg p-6">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-xl font-semibold">{{ editingId ? 'Edit User' : 'Add New User' }}</h2>
          <button
            class="text-slate-400 hover:text-slate-200 transition-colors"
            @click="closeModal"
          >
            ✕
          </button>
        </div>

        <form class="space-y-4" @submit.prevent="saveUser">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
            <Input v-model="form.name" placeholder="John Doe" required />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
            <Input v-model="form.email" type="email" placeholder="john@example.com" required />
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300">Role</label>
            <select
              v-model="form.role"
              class="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Developer</option>
              <option>QA</option>
              <option>User</option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-300">Status</label>
            <select
              v-model="form.status"
              class="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="secondary" type="button" @click="closeModal">Cancel</Button>
            <Button type="submit" :disabled="isSaving">
              {{ isSaving ? 'Saving...' : 'Save User' }}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>
