<script setup>
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNoteStore } from '@/stores/notes'
import { formatDate } from '@/utils/format'
import BaseButton from '@/components/common/BaseButton.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const noteStore = useNoteStore()

const note = computed(() => noteStore.current)

onMounted(() => {
  noteStore.loadById(route.params.id)
})

function goBack() {
  router.push('/notes')
}
</script>

<template>
  <LoadingSpinner v-if="noteStore.loading" />
  <div v-else-if="note" class="detail">
    <BaseButton type="ghost" @click="goBack">← 返回列表</BaseButton>
    <article class="detail__article">
      <header>
        <h1>{{ note.isPinned ? '📌 ' : '' }}{{ note.title }}</h1>
        <div class="detail__meta">
          <span class="category">{{ note.category }}</span>
          <span>更新于 {{ formatDate(note.updatedAt, true) }}</span>
        </div>
      </header>
      <div class="detail__content">{{ note.content }}</div>
    </article>
  </div>
</template>

<style scoped>
.detail { max-width: 800px; }
.detail__article {
  margin-top: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
}
.detail__article h1 { margin: 0 0 12px; font-size: 24px; }
.detail__meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}
.category {
  background: var(--primary-light);
  color: var(--primary);
  padding: 2px 10px;
  border-radius: 4px;
  font-weight: 500;
}
.detail__content {
  line-height: 1.8;
  white-space: pre-wrap;
  font-size: 15px;
}
</style>
