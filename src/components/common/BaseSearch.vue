<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '搜索...' },
})

defineEmits(['update:modelValue', 'search'])
</script>

<template>
  <div class="base-search">
    <span class="base-search__icon">🔍</span>
    <input
      class="base-search__input"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup.enter="$emit('search', modelValue)"
    />
  </div>
</template>

<style scoped>
.base-search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  min-width: 220px;
}
.base-search__icon { opacity: 0.5; font-size: 14px; }
.base-search__input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px 0;
  outline: none;
  font-size: 14px;
  color: var(--text);
}
</style>
