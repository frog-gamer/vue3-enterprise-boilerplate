<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { User } from '@/services/user';
import { userService } from '@/services/user';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import { ChevronLeft } from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();

const user = ref<User | null>(null);
const isLoading = ref(false);
const error = ref('');
const isEditing = ref(false);
const form = ref<Partial<User>>({});

async function loadUser() {
  const userId = route.params.id as string;
  isLoading.value = true;
  error.value = '';
  try {
    const data = await userService.get(userId);
    user.value = data;
    form.value = { ...data };
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load user';
  } finally {
    isLoading.value = false;
  }
}

async function saveUser() {
  if (!user.value) return;

  try {
    await userService.update(user.value.id, form.value);
    user.value = { ...user.value, ...form.value };
    isEditing.value = false;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to update user';
  }
}

async function deleteUser() {
  if (!user.value || !confirm('Are you sure you want to delete this user?')) return;

  try {
    await userService.delete(user.value.id);
    await router.push({ name: 'user-list' });
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to delete user';
  }
}

onMounted(() => {
  void loadUser();
});
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <Button variant="ghost" size="sm" @click="() => router.back()">
        <ChevronLeft class="h-4 w-4" />
      </Button>
      <div>
        <p class="text-sm text-slate-400">User Details</p>
        <h1 class="text-3xl font-bold tracking-tight">{{ user?.name ?? 'Loading...' }}</h1>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="rounded-md bg-red-500/10 p-4 text-sm text-red-300">
      {{ error }}
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center p-8">
      <div class="text-slate-400">Loading user...</div>
    </div>

    <!-- User Details -->
    <template v-else-if="user">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Main Card -->
        <div class="md:col-span-2 space-y-6">
          <Card class="p-6">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="text-xl font-semibold">User Information</h2>
              <div class="flex gap-2">
                <Button
                  v-if="!isEditing"
                  variant="secondary"
                  @click="isEditing = true"
                >
                  Edit
                </Button>
                <template v-else>
                  <Button variant="secondary" @click="isEditing = false">Cancel</Button>
                  <Button @click="saveUser">Save Changes</Button>
                </template>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label class="mb-1 block text-sm text-slate-300">Name</label>
                <Input
                  v-if="isEditing"
                  v-model="form.name"
                  placeholder="Full name"
                />
                <div v-else class="text-slate-100">{{ user.name }}</div>
              </div>

              <div>
                <label class="mb-1 block text-sm text-slate-300">Email</label>
                <Input
                  v-if="isEditing"
                  v-model="form.email"
                  type="email"
                  placeholder="email@company.com"
                />
                <div v-else class="text-slate-100">{{ user.email }}</div>
              </div>

              <div>
                <label class="mb-1 block text-sm text-slate-300">Department</label>
                <Input
                  v-if="isEditing"
                  v-model="form.department"
                  placeholder="Department"
                />
                <div v-else class="text-slate-100">{{ user.department }}</div>
              </div>

              <div>
                <label class="mb-1 block text-sm text-slate-300">Phone</label>
                <Input
                  v-if="isEditing"
                  v-model="form.phone"
                  placeholder="Phone number"
                />
                <div v-else class="text-slate-100">{{ user.phone }}</div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="mb-1 block text-sm text-slate-300">Role</label>
                  <select
                    v-if="isEditing"
                    v-model="form.role"
                    class="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 text-sm text-slate-100"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="QA">QA</option>
                  </select>
                  <div v-else class="text-slate-100">{{ user.role }}</div>
                </div>

                <div>
                  <label class="mb-1 block text-sm text-slate-300">Status</label>
                  <select
                    v-if="isEditing"
                    v-model="form.status"
                    class="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 text-sm text-slate-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <div v-else>
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
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <Card class="p-4">
            <h3 class="mb-4 font-semibold">Join Date</h3>
            <div class="text-sm text-slate-300">
              {{ new Date(user.joinDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
          </Card>

          <Card class="p-4 border-red-500/20 bg-red-500/5">
            <h3 class="mb-3 font-semibold text-red-300">Danger Zone</h3>
            <Button
              variant="ghost"
              class="w-full text-red-300 hover:bg-red-500/10"
              @click="deleteUser"
            >
              Delete User
            </Button>
          </Card>
        </div>
      </div>
    </template>
  </div>
</template>
