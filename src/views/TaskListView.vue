<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'
import { getUsers } from '@/api/auth'
import {
  TASK_STATUS,
  TASK_STATUS_LABELS,
  TASK_PRIORITY,
  TASK_PRIORITY_LABELS,
  DEFAULT_PAGE_SIZE,
} from '@/utils/constants'
import { formatDate } from '@/utils/format'
import { useDebouncedFn } from '@/composables/useDebounce'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseSearch from '@/components/common/BaseSearch.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import ConfirmDialog from '@/components/common/ConfirmDialog.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import TaskForm from '@/components/task/TaskForm.vue'

const router = useRouter()
const taskStore = useTaskStore()

const keyword = ref('')
const filterStatus = ref('')
const filterPriority = ref('')
const page = ref(1)
const users = ref([])

const showModal = ref(false)
const showDelete = ref(false)
const editingTask = ref(null)
const deletingId = ref(null)
const modalLoading = ref(false)
const taskFormRef = ref(null)

const statusOptions = [
  { value: '', label: '全部状态' },
  ...Object.entries(TASK_STATUS_LABELS).map(([value, label]) => ({ value, label })),
]
const priorityOptions = [
  { value: '', label: '全部优先级' },
  ...Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => ({ value, label })),
]

async function loadData() {
  await taskStore.loadList({
    keyword: keyword.value,
    status: filterStatus.value,
    priority: filterPriority.value,
    page: page.value,
    pageSize: DEFAULT_PAGE_SIZE,
  })
}

const debouncedSearch = useDebouncedFn(() => {
  page.value = 1
  loadData()
}, 400)

watch([filterStatus, filterPriority, page], loadData)
watch(keyword, debouncedSearch)

onMounted(async () => {
  const res = await getUsers()
  users.value = res.data
  loadData()
})

function getUserName(id) {
  return users.value.find((u) => u.id === id)?.name || '-'
}

function openCreate() {
  editingTask.value = null
  showModal.value = true
}

function openEdit(task) {
  editingTask.value = { ...task }
  showModal.value = true
}

function openDeleteConfirm(id) {
  deletingId.value = id
  showDelete.value = true
}

async function onFormSubmit(data) {
  modalLoading.value = true
  try {
    if (editingTask.value?.id) {
      await taskStore.edit(editingTask.value.id, data)
    } else {
      await taskStore.add(data)
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
    await taskStore.remove(deletingId.value)
    showDelete.value = false
    loadData()
  } finally {
    modalLoading.value = false
  }
}

function goDetail(id) {
  router.push(`/tasks/${id}`)
}
</script>

<template>
  <div class="task-list">
    <div class="toolbar">
      <BaseSearch v-model="keyword" placeholder="搜索任务..." />
      <BaseSelect v-model="filterStatus" :options="statusOptions" />
      <BaseSelect v-model="filterPriority" :options="priorityOptions" />
      <BaseButton type="primary" @click="openCreate">+ 新建任务</BaseButton>
    </div>

    <div v-loading="taskStore.loading" class="table-wrap">
      <LoadingSpinner v-if="taskStore.loading && !taskStore.list.length" />
      <EmptyState v-else-if="!taskStore.list.length" title="暂无任务" description="点击上方按钮创建第一个任务" />
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>标题</th>
            <th>状态</th>
            <th>优先级</th>
            <th>负责人</th>
            <th>截止日期</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in taskStore.list" :key="task.id">
            <td>
              <a class="link" @click="goDetail(task.id)">{{ task.title }}</a>
              <div class="tags">
                <span v-for="tag in task.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </td>
            <td><StatusBadge :status="task.status" /></td>
            <td><StatusBadge :status="task.priority" /></td>
            <td>{{ getUserName(task.assigneeId) }}</td>
            <td>{{ formatDate(task.dueDate) }}</td>
            <td>{{ formatDate(task.updatedAt, true) }}</td>
            <td class="actions">
              <BaseButton type="ghost" size="sm" @click="openEdit(task)">编辑</BaseButton>
              <BaseButton type="ghost" size="sm" @click="openDeleteConfirm(task.id)">删除</BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BasePagination
      v-if="taskStore.total > 0"
      v-model:page="page"
      :total="taskStore.total"
      :page-size="DEFAULT_PAGE_SIZE"
    />

    <BaseModal
      v-model:visible="showModal"
      :title="editingTask ? '编辑任务' : '新建任务'"
      :loading="modalLoading"
      @confirm="taskFormRef?.handleSubmit()"
    >
      <TaskForm
        ref="taskFormRef"
        :initial="editingTask || {}"
        :users="users"
        @submit="onFormSubmit"
      />
    </BaseModal>

    <ConfirmDialog
      v-model:visible="showDelete"
      message="确定要删除这个任务吗？此操作不可撤销。"
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
.table-wrap {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow-x: auto;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.data-table th,
.data-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}
.data-table th {
  background: var(--bg-hover);
  font-weight: 600;
  font-size: 13px;
  color: var(--text-secondary);
}
.link { color: var(--primary); cursor: pointer; font-weight: 500; }
.link:hover { text-decoration: underline; }
.tags { display: flex; gap: 4px; margin-top: 4px; flex-wrap: wrap; }
.tag {
  font-size: 11px;
  padding: 1px 6px;
  background: var(--bg-hover);
  border-radius: 4px;
  color: var(--text-secondary);
}
.actions { display: flex; gap: 4px; white-space: nowrap; }
</style>
