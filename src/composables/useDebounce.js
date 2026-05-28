import { ref, watch } from 'vue'

export function useDebounce(value, delay = 300) {
  const debounced = ref(value.value ?? value)
  let timer = null

  watch(
    () => (typeof value === 'object' && 'value' in value ? value.value : value),
    (newVal) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        debounced.value = newVal
      }, delay)
    }
  )

  return debounced
}

export function useDebouncedFn(fn, delay = 300) {
  let timer = null
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
