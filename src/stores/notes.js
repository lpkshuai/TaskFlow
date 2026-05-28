import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchNotes,
  fetchNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '@/api/notes'

export const useNoteStore = defineStore('notes', () => {
  const list = ref([])
  const current = ref(null)
  const total = ref(0)
  const loading = ref(false)

  async function loadList(params = {}) {
    loading.value = true
    try {
      const res = await fetchNotes(params)
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
      const res = await fetchNoteById(id)
      current.value = res.data
      return res.data
    } finally {
      loading.value = false
    }
  }

  async function add(data) {
    const res = await createNote(data)
    return res.data
  }

  async function edit(id, data) {
    const res = await updateNote(id, data)
    return res.data
  }

  async function remove(id) {
    await deleteNote(id)
    list.value = list.value.filter((n) => n.id !== id)
    total.value = Math.max(0, total.value - 1)
  }

  return {
    list,
    current,
    total,
    loading,
    loadList,
    loadById,
    add,
    edit,
    remove,
  }
})
