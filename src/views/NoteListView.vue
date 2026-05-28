<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/notes'
import { useUserStore } from '@/stores/user'
import { NOTE_CATEGORIES, DEFAULT_PAGE_SIZE } from '@/utils/constants'
import { formatDate, truncate } from '@/utils/format'
import { useDebouncedFn } from '@/composables/useDebounce'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseSearch from '@/components/common/BaseSearch.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import NoteForm from '@/components/note/NoteForm.vue'

const router = useRouter()
const noteStore = useNoteStore()
const userStore = useUserStore()

const keyword = ref('')
const filterCategory = ref('')
const page = ref(1)

const showModal = ref(false)
const showDelete = ref(false)
const editingNote = ref(null)
const deletingId = ref(null)
const modalLoading = ref(false)
const noteFormRef = ref(null)

const categoryOptions = [
  { value: '', label: '全部分类' },
  ...NOTE_CATEGORIES.map((c) => ({ value: c, label: c })),
]

async function loadData() {
  await noteStore.loadList({
    keyword: keyword.value,
    category: filterCategory.value,
    page: page.value,
    pageSize: DEFAULT_PAGE_SIZE,
  })
}

const debouncedSearch = useDebouncedFn(() => {
  page.value = 1
  loadData()
}, 400)

watch([filterCategory, page], loadData)
watch(keyword, debouncedSearch)

onMounted(loadData)

function openCreate() {
  editingNote.value = null
  showModal.value = true
}

function openEdit(note) {
  editingNote.value = { ...note }
  showModal.value = true
}

function openDeleteConfirm(id) {
  deletingId.value = id
  showDelete.value = true
}

async function onFormSubmit(data) {
  modalLoading.value = true
  try {
    const payload = { ...data, authorId: userStore.user.id }
    if (editingNote.value?.id) {
      await noteStore.edit(editingNote.value.id, payload)
    } else {
      await noteStore.add(payload)
    }
    showModal.value = false
    loadData()
  } finally {
    modalLoading.value = false
  }
}

async function confirmDelete() {
  modalLoading.value = true
  try {
    await noteStore.remove(deletingId.value)
    showDelete.value = false
    loadData()
  } finally {
    modalLoading.value = false
  }
}

function goDetail(id) {
  router.push(`/notes/${id}`)
}
</script>

<template>
  <div class="note-list">
    <div class="toolbar">
      <BaseSearch v-model="keyword" placeholder="搜索笔记..." />
      <BaseSelect v-model="filterCategory" :options="categoryOptions" />
      <BaseButton type="primary" @click="openCreate">+ 新建笔记</BaseButton>
    </div>

    <div v-loading="noteStore.loading">
      <LoadingSpinner v-if="noteStore.loading && !noteStore.list.length" />
      <EmptyState v-else-if="!noteStore.list.length" title="暂无笔记" />
      <div v-else class="note-grid">
        <div
          v-for="note in noteStore.list"
          :key="note.id"
          class="note-card"
          @click="goDetail(note.id)"
        >
          <div class="note-card__header">
            <h4>{{ note.isPinned ? '📌 ' : '' }}{{ note.title }}</h4>
            <span class="note-card__category">{{ note.category }}</span>
          </div>
          <p class="note-card__content">{{ truncate(note.content, 100) }}</p>
          <div class="note-card__footer">
            <span>{{ formatDate(note.updatedAt, true) }}</span>
            <div class="note-card__actions" @click.stop>
              <BaseButton type="ghost" size="sm" @click="openEdit(note)">编辑</BaseButton>
              <BaseButton type="ghost" size="sm" @click="openDeleteConfirm(note.id)">删除</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <BasePagination
      v-if="noteStore.total > 0"
      v-model:page="page"
      :total="noteStore.total"
      :page-size="DEFAULT_PAGE_SIZE"
    />

    <BaseModal
      v-model:visible="showModal"
      :title="editingNote ? '编辑笔记' : '新建笔记'"
      :loading="modalLoading"
      @confirm="noteFormRef?.handleSubmit()"
    >
      <NoteForm ref="noteFormRef" :initial="editingNote || {}" @submit="onFormSubmit" />
    </BaseModal>

    <ConfirmDialog
      v-model:visible="showDelete"
      message="确定要删除这篇笔记吗？"
      :loading="modalLoading"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
}
.note-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
.note-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.note-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow);
}
.note-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}
.note-card__header h4 { margin: 0; font-size: 15px; flex: 1; }
.note-card__category {
  font-size: 11px;
  padding: 2px 8px;
  background: var(--bg-hover);
  border-radius: 4px;
  color: var(--text-secondary);
  white-space: nowrap;
}
.note-card__content {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 12px;
  white-space: pre-wrap;
}
.note-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--text-secondary);
}
.note-card__actions { display: flex; gap: 4px; }
</style>
