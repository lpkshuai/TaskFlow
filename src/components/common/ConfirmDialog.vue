<script setup>
import BaseModal from './BaseModal.vue'

defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '确认操作' },
  message: { type: String, default: '确定要执行此操作吗？' },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['update:visible', 'confirm'])
</script>

<template>
  <BaseModal
    :visible="visible"
    :title="title"
    width="400px"
    confirm-text="确认"
    :loading="loading"
    @update:visible="emit('update:visible', $event)"
    @confirm="emit('confirm')"
  >
    <p class="confirm-msg">{{ message }}</p>
  </BaseModal>
</template>

<style scoped>
.confirm-msg { margin: 0; font-size: 14px; line-height: 1.6; }
</style>
