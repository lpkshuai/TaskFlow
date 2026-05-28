<script setup>
import { ref, watch, computed } from 'vue'
import {
  TASK_STATUS,
  TASK_STATUS_LABELS,
  TASK_PRIORITY,
  TASK_PRIORITY_LABELS,
} from '@/utils/constants'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  users: { type: Array, default: () => [] },
})

const emit = defineEmits(['submit'])

const form = ref({
  title: '',
  description: '',
  status: TASK_STATUS.TODO,
  priority: TASK_PRIORITY.MEDIUM,
  assigneeId: '',
  dueDate: '',
  tags: '',
})

const errors = ref({})

watch(
  () => props.initial,
  (val) => {
    if (val && Object.keys(val).length) {
      form.value = {
        title: val.title || '',
        description: val.description || '',
        status: val.status || TASK_STATUS.TODO,
        priority: val.priority || TASK_PRIORITY.MEDIUM,
        assigneeId: val.assigneeId || '',
        dueDate: val.dueDate || '',
        tags: (val.tags || []).join(', '),
      }
    }
  },
  { immediate: true }
)

const statusOptions = Object.entries(TASK_STATUS_LABELS).map(([value, label]) => ({ value, label }))
const priorityOptions = Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => ({ value, label }))
const userOptions = computed(() => props.users.map((u) => ({ value: u.id, label: u.name })))

function validate() {
  errors.value = {}
  if (!form.value.title.trim()) errors.value.title = '请输入任务标题'
  if (!form.value.assigneeId) errors.value.assigneeId = '请选择负责人'
  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', {
    ...form.value,
    tags: form.value.tags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean),
  })
}

defineExpose({ handleSubmit })
</script>

<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <BaseInput v-model="form.title" label="任务标题" placeholder="输入任务标题" :error="errors.title" />
    <div class="task-form__field">
      <label>任务描述</label>
      <textarea v-model="form.description" rows="3" placeholder="输入任务描述"></textarea>
    </div>
    <div class="task-form__row">
      <BaseSelect v-model="form.status" label="状态" :options="statusOptions" />
      <BaseSelect v-model="form.priority" label="优先级" :options="priorityOptions" />
    </div>
    <div class="task-form__row">
      <BaseSelect v-model="form.assigneeId" label="负责人" :options="userOptions" :error="errors.assigneeId" />
      <BaseInput v-model="form.dueDate" label="截止日期" type="date" />
    </div>
    <BaseInput v-model="form.tags" label="标签" placeholder="多个标签用逗号分隔" />
  </form>
</template>

<style scoped>
.task-form { display: flex; flex-direction: column; gap: 16px; }
.task-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.task-form__field label { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
.task-form__field textarea {
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
@media (max-width: 600px) {
  .task-form__row { grid-template-columns: 1fr; }
}
</style>
