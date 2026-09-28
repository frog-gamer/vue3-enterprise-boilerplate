import { computed, ref } from 'vue';

export function usePagination(initialPage = 1, initialLimit = 10) {
  const page = ref(initialPage);
  const limit = ref(initialLimit);
  const total = ref(0);

  const totalPages = computed(() => Math.max(1, Math.ceil(total.value / limit.value)));
  const offset = computed(() => (page.value - 1) * limit.value);
  const hasPrevious = computed(() => page.value > 1);
  const hasNext = computed(() => page.value < totalPages.value);

  function nextPage() {
    if (hasNext.value) page.value += 1;
  }

  function previousPage() {
    if (hasPrevious.value) page.value -= 1;
  }

  function goToPage(nextPage: number) {
    page.value = Math.min(Math.max(1, nextPage), totalPages.value);
  }

  function setTotal(nextTotal: number) {
    total.value = Math.max(0, nextTotal);
  }

  return {
    page,
    limit,
    total,
    totalPages,
    offset,
    hasPrevious,
    hasNext,
    nextPage,
    previousPage,
    goToPage,
    setTotal,
  };
}
