<script setup>
defineProps({
  text: { type: String, default: '加载中...' },
})
</script>

<template>
  <div class="spinner-wrap">
    <div class="spinner"></div>
    <p v-if="text">{{ text }}</p>
  </div>
</template>

<style scoped>
.spinner-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 40px;
  color: var(--text-secondary);
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
</style>
