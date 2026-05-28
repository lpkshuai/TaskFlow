<script setup>
defineProps({
  title: { type: String, default: '暂无数据' },
  description: { type: String, default: '' },
})
</script>

<template>
  <div class="empty">
    <div class="empty__icon">📭</div>
    <h4>{{ title }}</h4>
    <p v-if="description">{{ description }}</p>
    <slot />
  </div>
</template>

<style scoped>
.empty {
  text-align: center;
  padding: 48px 20px;
  color: var(--text-secondary);
}
.empty__icon { font-size: 48px; margin-bottom: 12px; }
.empty h4 { margin: 0 0 8px; color: var(--text); font-size: 16px; }
.empty p { margin: 0; font-size: 14px; }
</style>
