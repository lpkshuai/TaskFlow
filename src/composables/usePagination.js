import { ref, computed } from 'vue'
import { DEFAULT_PAGE_SIZE } from '@/utils/constants'

export function usePagination(initialPageSize = DEFAULT_PAGE_SIZE) {
  const page = ref(1)
  const pageSize = ref(initialPageSize)
  const total = ref(0)

  const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))

  function setPage(p) {
    page.value = Math.min(Math.max(1, p), totalPages.value)
  }

  function setTotal(t) {
    total.value = t
    if (page.value > totalPages.value) {
      page.value = totalPages.value
    }
  }

  function reset() {
    page.value = 1
  }

  return {
    page,
    pageSize,
    total,
    totalPages,
    setPage,
    setTotal,
    reset,
  }
}
