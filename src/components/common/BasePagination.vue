<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 10 },
  total: { type: Number, default: 0 },
})

const emit = defineEmits(['update:page'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

function goTo(p) {
  if (p < 1 || p > totalPages.value) return
  emit('update:page', p)
}
</script>

<template>
  <div class="pagination">
    <span class="pagination__info">共 {{ total }} 条</span>
    <button class="pagination__btn" :disabled="page <= 1" @click="goTo(page - 1)">上一页</button>
    <span class="pagination__current">{{ page }} / {{ totalPages }}</span>
    <button class="pagination__btn" :disabled="page >= totalPages" @click="goTo(page + 1)">下一页</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-end;
  padding: 12px 0;
}
.pagination__info { font-size: 13px; color: var(--text-secondary); }
.pagination__current { font-size: 13px; min-width: 60px; text-align: center; }
.pagination__btn {
  padding: 4px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  cursor: pointer;
  font-size: 13px;
}
.pagination__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.pagination__btn:not(:disabled):hover { border-color: var(--primary); color: var(--primary); }
</style>
