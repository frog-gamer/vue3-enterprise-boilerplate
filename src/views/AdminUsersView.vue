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
  try { users.value = await userService.list(); }
  catch { error.value = 'Tidak dapat memuat users. Pastikan mock API berjalan di port 3000.'; }
  finally { isLoading.value = false; }
}

function emptyForm(): UserPayload { return { name: '', email: '', role: 'User', status: 'Active' }; }
function openCreate() { editingId.value = null; form.value = emptyForm(); isOpen.value = true; }
function openEdit(user: User) { editingId.value = user.id ?? null; form.value = { name: user.name, email: user.email, role: user.role, status: user.status }; isOpen.value = true; }
function closeModal() { isOpen.value = false; }

async function saveUser() {
  if (!form.value.name || !form.value.email) return;
  isSaving.value = true;
  try {
    const saved = editingId.value ? await userService.update(editingId.value, form.value) : await userService.create(form.value);
    if (editingId.value) users.value = users.value.map((user) => user.id === saved.id ? saved : user);
    else users.value.unshift(saved);
    closeModal();
  } catch { error.value = 'User gagal disimpan.'; }
  finally { isSaving.value = false; }
}

async function removeUser(id?: string) {
  if (!id || !window.confirm('Hapus user ini?')) return;
  try { await userService.remove(id); users.value = users.value.filter((user) => user.id !== id); }
  catch { error.value = 'User gagal dihapus.'; }
}

onMounted(() => { void loadUsers(); });
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
      <div><p class="text-sm text-slate-400">User Access</p><h1 class="text-3xl font-bold tracking-tight">User Management</h1></div>
      <Button @click="openCreate">Add User</Button>
    </div>
    <p v-if="error" class="rounded-md bg-red-500/10 p-3 text-sm text-red-300">{{ error }}</p>
    <Card>
      <div v-if="isLoading" class="p-6 text-slate-400">Loading users...</div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full text-left text-sm"><thead class="border-b border-slate-800 text-slate-300"><tr><th class="px-4 py-3">Name</th><th class="px-4 py-3">Email</th><th class="px-4 py-3">Role</th><th class="px-4 py-3">Status</th><th class="px-4 py-3 text-right">Action</th></tr></thead>
          <tbody><tr v-for="user in users" :key="user.id" class="border-b border-slate-800/70"><td class="px-4 py-3 font-medium">{{ user.name }}</td><td class="px-4 py-3 text-slate-300">{{ user.email }}</td><td class="px-4 py-3 text-slate-300">{{ user.role }}</td><td class="px-4 py-3"><span class="rounded-full bg-blue-500/15 px-2.5 py-1 text-xs text-blue-300">{{ user.status }}</span></td><td class="space-x-2 px-4 py-3 text-right"><Button variant="ghost" size="sm" @click="openEdit(user)">Edit</Button><Button variant="ghost" size="sm" @click="removeUser(user.id)">Delete</Button></td></tr></tbody>
        </table>
      </div>
    </Card>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"><Card class="w-full max-w-lg p-6"><div class="mb-5 flex items-center justify-between"><h2 class="text-xl font-semibold">{{ editingId ? 'Edit User' : 'Add User' }}</h2><Button variant="ghost" size="icon" @click="closeModal">×</Button></div><form class="space-y-4" @submit.prevent="saveUser"><div><label class="mb-1 block text-sm text-slate-300">Name</label><Input v-model="form.name" required /></div><div><label class="mb-1 block text-sm text-slate-300">Email</label><Input v-model="form.email" type="email" required /></div><div><label class="mb-1 block text-sm text-slate-300">Role</label><select v-model="form.role" class="h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 text-sm"><option>Admin</option><option>Manager</option><option>Developer</option><option>QA</option><option>User</option></select></div><div><label class="mb-1 block text-sm text-slate-300">Status</label><select v-model="form.status" class="h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 text-sm"><option value="Active">Active</option><option value="Pending">Pending</option><option value="Inactive">Inactive</option></select></div><div class="flex justify-end gap-3"><Button variant="secondary" type="button" @click="closeModal">Cancel</Button><Button type="submit" :disabled="isSaving">{{ isSaving ? 'Saving...' : 'Save User' }}</Button></div></form></Card></div>
  </div>
</template>
