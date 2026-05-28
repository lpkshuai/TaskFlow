import { ref } from 'vue'

export function useAsync(asyncFn) {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  async function execute(...args) {
    loading.value = true
    error.value = null
    try {
      const result = await asyncFn(...args)
      data.value = result
      return result
    } catch (err) {
      error.value = err.message || '操作失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  function reset() {
    loading.value = false
    error.value = null
    data.value = null
  }

  return { loading, error, data, execute, reset }
}
