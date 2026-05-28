<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'
import { getUsers } from '@/api/auth'
import { ref } from 'vue'
import { formatDate } from '@/utils/format'
import StatusBadge from '@/components/common/StatusBadge.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const users = ref([])

const task = computed(() => taskStore.current)

onMounted(async () => {
  const [usersRes] = await Promise.all([
    getUsers(),
    taskStore.loadById(route.params.id),
  ])
  users.value = usersRes.data
})

function getUserName(id) {
  return users.value.find((u) => u.id === id)?.name || '-'
}

function goBack() {
  router.push('/tasks')
}

function goEdit() {
  router.push({ path: '/tasks', query: { edit: task.value?.id } })
}
</script>

<template>
  <LoadingSpinner v-if="taskStore.loading" />
  <div v-else-if="task" class="detail">
    <div class="detail__header">
      <BaseButton type="ghost" @click="goBack">← 返回列表</BaseButton>
      <BaseButton type="primary" size="sm" @click="goEdit">编辑</BaseButton>
    </div>

    <div class="detail__card">
      <h2>{{ task.title }}</h2>
      <div class="detail__meta">
        <StatusBadge :status="task.status" />
        <StatusBadge :status="task.priority" />
        <span>负责人：{{ getUserName(task.assigneeId) }}</span>
        <span>截止：{{ formatDate(task.dueDate) }}</span>
      </div>
      <div class="detail__tags">
        <span v-for="tag in task.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <div class="detail__section">
        <h4>描述</h4>
        <p>{{ task.description || '暂无描述' }}</p>
      </div>
      <div class="detail__footer">
        <span>创建：{{ formatDate(task.createdAt, true) }}</span>
        <span>更新：{{ formatDate(task.updatedAt, true) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.detail__card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
}
.detail__card h2 { margin: 0 0 16px; }
.detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}
.detail__tags { display: flex; gap: 6px; margin-bottom: 20px; }
.tag {
  font-size: 12px;
  padding: 2px 8px;
  background: var(--bg-hover);
  border-radius: 4px;
}
.detail__section h4 { margin: 0 0 8px; font-size: 14px; color: var(--text-secondary); }
.detail__section p { margin: 0; line-height: 1.7; white-space: pre-wrap; }
.detail__footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: var(--text-secondary);
}
</style>
