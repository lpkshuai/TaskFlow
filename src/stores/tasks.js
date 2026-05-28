import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTask,
  deleteTask,
  fetchDashboardStats,
} from '@/api/tasks'

export const useTaskStore = defineStore('tasks', () => {
  const list = ref([])
  const current = ref(null)
  const total = ref(0)
  const loading = ref(false)
  const dashboardStats = ref(null)

  async function loadList(params = {}) {
    loading.value = true
    try {
      const res = await fetchTasks(params)
      list.value = res.data.list
      total.value = res.data.total
      return res.data
    } finally {
      loading.value = false
    }
  }

  async function loadById(id) {
    loading.value = true
    try {
      const res = await fetchTaskById(id)
      current.value = res.data
      return res.data
    } finally {
      loading.value = false
    }
  }

  async function add(data) {
    const res = await createTask(data)
    return res.data
  }

  async function edit(id, data) {
    const res = await updateTask(id, data)
    return res.data
  }

  async function remove(id) {
    await deleteTask(id)
    list.value = list.value.filter((t) => t.id !== id)
    total.value = Math.max(0, total.value - 1)
  }

  async function loadDashboardStats() {
    const res = await fetchDashboardStats()
    dashboardStats.value = res.data
    return res.data
  }

  return {
    list,
    current,
    total,
    loading,
    dashboardStats,
    loadList,
    loadById,
    add,
    edit,
    remove,
    loadDashboardStats,
  }
})
