import { computed, ref } from 'vue';

export function useAsync<T>(asyncFunction: () => Promise<T>) {
  const data = ref<T | null>(null);
  const error = ref<unknown>(null);
  const isLoading = ref(false);

  const errorMessage = computed(() => {
    if (error.value instanceof Error) return error.value.message;
    if (typeof error.value === 'object' && error.value !== null && 'message' in error.value) {
      return String(error.value.message);
    }
    return 'Terjadi kesalahan. Silakan coba lagi.';
  });

  async function execute() {
    isLoading.value = true;
    error.value = null;

    try {
      data.value = await asyncFunction();
      return data.value;
    } catch (requestError) {
      error.value = requestError;
      throw requestError;
    } finally {
      isLoading.value = false;
    }
  }

  return { data, error, errorMessage, isLoading, execute };
}
