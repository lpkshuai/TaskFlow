<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: '请选择' },
  error: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="base-select" :class="{ 'base-select--error': error }">
    <label v-if="label" class="base-select__label">{{ label }}</label>
    <select
      class="base-select__field"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <p v-if="error" class="base-select__error">{{ error }}</p>
  </div>
</template>

<style scoped>
.base-select { display: flex; flex-direction: column; gap: 6px; }
.base-select__label { font-size: 13px; font-weight: 500; color: var(--text-secondary); }
.base-select__field {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-card);
  color: var(--text);
  font-size: 14px;
  outline: none;
}
.base-select--error .base-select__field { border-color: var(--danger); }
.base-select__error { font-size: 12px; color: var(--danger); margin: 0; }
</style>
