<script setup>
defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: 'md' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
})

defineEmits(['click'])
</script>

<template>
  <button
    class="base-btn"
    :class="[`base-btn--${type}`, `base-btn--${size}`, { 'base-btn--block': block }]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="base-btn__spinner"></span>
    <slot />
  </button>
</template>

<style scoped>
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.base-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-btn--sm { padding: 4px 10px; font-size: 12px; }
.base-btn--md { padding: 8px 16px; font-size: 14px; }
.base-btn--lg { padding: 10px 20px; font-size: 16px; }

.base-btn--default {
  background: var(--bg-card);
  border-color: var(--border);
  color: var(--text);
}
.base-btn--default:hover:not(:disabled) {
  border-color: var(--primary);
  color: var(--primary);
}

.base-btn--primary {
  background: var(--primary);
  color: #fff;
}
.base-btn--primary:hover:not(:disabled) {
  background: var(--primary-dark);
}

.base-btn--danger {
  background: var(--danger);
  color: #fff;
}
.base-btn--danger:hover:not(:disabled) {
  filter: brightness(0.9);
}

.base-btn--ghost {
  background: transparent;
  color: var(--text-secondary);
}
.base-btn--ghost:hover:not(:disabled) {
  background: var(--bg-hover);
  color: var(--text);
}

.base-btn--block { width: 100%; }

.base-btn__spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
</style>
