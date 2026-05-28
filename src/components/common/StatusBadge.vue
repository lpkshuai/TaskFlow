<script setup>
defineProps({
  status: { type: String, default: 'todo' },
  label: { type: String, default: '' },
})

const statusMap = {
  todo: { class: 'badge--todo', text: '待办' },
  in_progress: { class: 'badge--progress', text: '进行中' },
  done: { class: 'badge--done', text: '已完成' },
  low: { class: 'badge--low', text: '低' },
  medium: { class: 'badge--medium', text: '中' },
  high: { class: 'badge--high', text: '高' },
  admin: { class: 'badge--admin', text: '管理员' },
  user: { class: 'badge--user', text: '用户' },
}
</script>

<template>
  <span class="badge" :class="statusMap[status]?.class">
    {{ label || statusMap[status]?.text || status }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}
.badge--todo { background: #f0f0f0; color: #666; }
.badge--progress { background: #e6f4ff; color: #1677ff; }
.badge--done { background: #f6ffed; color: #52c41a; }
.badge--low { background: #f6ffed; color: #52c41a; }
.badge--medium { background: #fff7e6; color: #fa8c16; }
.badge--high { background: #fff1f0; color: #ff4d4f; }
.badge--admin { background: #f9f0ff; color: #722ed1; }
.badge--user { background: #e6f4ff; color: #1677ff; }
</style>
