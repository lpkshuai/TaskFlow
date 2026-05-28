import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)
  const globalLoading = ref(false)
  const pageTitle = ref('')

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setPageTitle(title) {
    pageTitle.value = title
  }

  function setGlobalLoading(loading) {
    globalLoading.value = loading
  }

  return {
    sidebarCollapsed,
    globalLoading,
    pageTitle,
    toggleSidebar,
    setPageTitle,
    setGlobalLoading,
  }
})
