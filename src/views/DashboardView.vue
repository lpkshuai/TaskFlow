<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'
import { formatDate, truncate } from '@/utils/format'
import StatusBadge from '@/components/common/StatusBadge.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const router = useRouter()
const taskStore = useTaskStore()

onMounted(() => {
  taskStore.loadDashboardStats()
})

function goTask(id) {
  router.push(`/tasks/${id}`)
}

function goNote(id) {
  router.push(`/notes/${id}`)
}
</script>

<template>
  <div v-if="!taskStore.dashboardStats" class="dashboard-loading">
    <LoadingSpinner />
  </div>
  <div v-else class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-card__label">任务总数</span>
        <span class="stat-card__value">{{ taskStore.dashboardStats.taskStats.total }}</span>
      </div>
      <div class="stat-card stat-card--todo">
        <span class="stat-card__label">待办</span>
        <span class="stat-card__value">{{ taskStore.dashboardStats.taskStats.todo }}</span>
      </div>
      <div class="stat-card stat-card--progress">
        <span class="stat-card__label">进行中</span>
        <span class="stat-card__value">{{ taskStore.dashboardStats.taskStats.inProgress }}</span>
      </div>
      <div class="stat-card stat-card--done">
        <span class="stat-card__label">已完成</span>
        <span class="stat-card__value">{{ taskStore.dashboardStats.taskStats.done }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__label">笔记总数</span>
        <span class="stat-card__value">{{ taskStore.dashboardStats.noteStats.total }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__label">置顶笔记</span>
        <span class="stat-card__value">{{ taskStore.dashboardStats.noteStats.pinned }}</span>
      </div>
    </div>

    <div class="dashboard-panels">
      <div class="panel">
        <h3>最近任务</h3>
        <ul class="recent-list">
          <li
            v-for="task in taskStore.dashboardStats.recentTasks"
            :key="task.id"
            class="recent-item"
            @click="goTask(task.id)"
          >
            <div class="recent-item__main">
              <span class="recent-item__title">{{ task.title }}</span>
              <StatusBadge :status="task.status" />
            </div>
            <span class="recent-item__meta">{{ formatDate(task.updatedAt, true) }}</span>
          </li>
        </ul>
      </div>
      <div class="panel">
        <h3>最近笔记</h3>
        <ul class="recent-list">
          <li
            v-for="note in taskStore.dashboardStats.recentNotes"
            :key="note.id"
            class="recent-item"
            @click="goNote(note.id)"
          >
            <div class="recent-item__main">
              <span class="recent-item__title">
                {{ note.isPinned ? '📌 ' : '' }}{{ note.title }}
              </span>
              <span class="recent-item__tag">{{ note.category }}</span>
            </div>
            <span class="recent-item__meta">{{ truncate(note.content, 40) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-loading { display: flex; justify-content: center; }
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.stat-card__label { font-size: 13px; color: var(--text-secondary); }
.stat-card__value { font-size: 28px; font-weight: 700; }
.stat-card--todo .stat-card__value { color: #666; }
.stat-card--progress .stat-card__value { color: #1677ff; }
.stat-card--done .stat-card__value { color: #52c41a; }

.dashboard-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
}
.panel h3 { margin: 0 0 16px; font-size: 16px; }
.recent-list { list-style: none; padding: 0; margin: 0; }
.recent-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.15s;
}
.recent-item:last-child { border-bottom: none; }
.recent-item:hover { opacity: 0.8; }
.recent-item__main { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.recent-item__title { font-size: 14px; font-weight: 500; flex: 1; }
.recent-item__tag { font-size: 12px; color: var(--text-secondary); background: var(--bg-hover); padding: 2px 8px; border-radius: 4px; }
.recent-item__meta { font-size: 12px; color: var(--text-secondary); }

@media (max-width: 768px) {
  .dashboard-panels { grid-template-columns: 1fr; }
}
</style>
