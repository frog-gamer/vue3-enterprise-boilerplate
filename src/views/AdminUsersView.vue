<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending' | 'Inactive';
};

const users = ref<User[]>([
  { id: 1, name: 'Alicia Thompson', email: 'alicia@company.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Ben Carter', email: 'ben@company.com', role: 'Manager', status: 'Pending' },
  { id: 3, name: 'Chloe Lee', email: 'chloe@company.com', role: 'Developer', status: 'Active' },
  { id: 4, name: 'Daniel Ross', email: 'daniel@company.com', role: 'QA', status: 'Inactive' },
]);

const form = ref({ name: '', email: '', role: 'User', status: 'Active' as User['status'] });
const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

function addUser() {
  if (!form.value.name || !form.value.email) return;

  users.value.unshift({
    id: Date.now(),
    name: form.value.name,
    email: form.value.email,
    role: form.value.role,
    status: form.value.status,
  });

  form.value = { name: '', email: '', role: 'User', status: 'Active' };
  closeModal();
}

function removeUser(id: number) {
  users.value = users.value.filter((user) => user.id !== id);
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-sm text-slate-400">User Access</p>
        <h1 class="text-3xl font-bold tracking-tight">User Management</h1>
      </div>
      <Button @click="openModal">Add User</Button>
    </div>

    <Card>
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm">
          <thead class="border-b border-slate-800 text-slate-300">
            <tr>
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3">Email</th>
              <th class="px-4 py-3">Role</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="border-b border-slate-800/70">
              <td class="px-4 py-3 font-medium">{{ user.name }}</td>
              <td class="px-4 py-3 text-slate-300">{{ user.email }}</td>
              <td class="px-4 py-3 text-slate-300">{{ user.role }}</td>
              <td class="px-4 py-3">
                <span
                  :class="[
                    'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
                    user.status === 'Active' && 'bg-emerald-500/15 text-emerald-300',
                    user.status === 'Pending' && 'bg-amber-500/15 text-amber-300',
                    user.status === 'Inactive' && 'bg-red-500/15 text-red-300',
                  ]"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <Button variant="ghost" size="sm" @click="removeUser(user.id)">Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
      <Card class="w-full max-w-lg p-4 md:p-6">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">Add New User</h2>
          <Button variant="ghost" size="icon" @click="closeModal">×</Button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm text-slate-300">Name</label>
            <Input v-model="form.name" placeholder="John Doe" />
          </div>
          <div>
            <label class="mb-1 block text-sm text-slate-300">Email</label>
            <Input v-model="form.email" type="email" placeholder="john@company.com" />
          </div>
          <div>
            <label class="mb-1 block text-sm text-slate-300">Role</label>
            <select v-model="form.role" class="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 text-sm text-slate-100">
              <option>Admin</option>
              <option>Manager</option>
              <option>Developer</option>
              <option>QA</option>
              <option>User</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-sm text-slate-300">Status</label>
            <select v-model="form.status" class="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 text-sm text-slate-100">
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <Button variant="secondary" @click="closeModal">Cancel</Button>
          <Button @click="addUser">Save User</Button>
        </div>
      </Card>
    </div>
  </div>
</template>
