<script setup>
import { ref, watch } from 'vue'
import { NOTE_CATEGORIES } from '@/utils/constants'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['submit'])

const form = ref({
  title: '',
  content: '',
  category: NOTE_CATEGORIES[0],
  isPinned: false,
})

watch(
  () => props.initial,
  (val) => {
    if (val && Object.keys(val).length) {
      form.value = {
        title: val.title || '',
        content: val.content || '',
        category: val.category || NOTE_CATEGORIES[0],
        isPinned: val.isPinned || false,
      }
    }
  },
  { immediate: true }
)

const categoryOptions = NOTE_CATEGORIES.map((c) => ({ value: c, label: c }))

function handleSubmit() {
  if (!form.value.title.trim()) return
  emit('submit', { ...form.value })
}

defineExpose({ handleSubmit })
</script>

<template>
  <form class="note-form" @submit.prevent="handleSubmit">
    <BaseInput v-model="form.title" label="标题" placeholder="笔记标题" />
    <div class="note-form__field">
      <label>内容</label>
      <textarea v-model="form.content" rows="6" placeholder="笔记内容"></textarea>
    </div>
    <div class="note-form__row">
      <BaseSelect v-model="form.category" label="分类" :options="categoryOptions" />
      <label class="note-form__checkbox">
        <input v-model="form.isPinned" type="checkbox" />
        置顶
      </label>
    </div>
  </form>
</template>

<style scoped>
.note-form { display: flex; flex-direction: column; gap: 16px; }
.note-form__field label { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
.note-form__field textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text);
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  margin-top: 6px;
}
.note-form__row { display: flex; align-items: flex-end; gap: 24px; }
.note-form__checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  padding-bottom: 8px;
  cursor: pointer;
}
</style>
