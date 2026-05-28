import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as loginApi, getProfile, updateProfile } from '@/api/auth'
import { TOKEN_KEY, USER_KEY } from '@/utils/constants'
import { getItem, setItem, removeItem } from '@/utils/storage'

export const useUserStore = defineStore('user', () => {
  const token = ref(getItem(TOKEN_KEY, ''))
  const user = ref(getItem(USER_KEY, null))

  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const displayName = computed(() => user.value?.name || user.value?.username || '用户')

  async function login(credentials) {
    const res = await loginApi(credentials)
    token.value = res.data.token
    user.value = res.data.user
    setItem(TOKEN_KEY, token.value)
    setItem(USER_KEY, user.value)
    return res.data
  }

  function logout() {
    token.value = ''
    user.value = null
    removeItem(TOKEN_KEY)
    removeItem(USER_KEY)
  }

  async function fetchProfile() {
    if (!user.value?.id) return
    const res = await getProfile(user.value.id)
    user.value = res.data
    setItem(USER_KEY, user.value)
    return res.data
  }

  async function saveProfile(data) {
    const payload = { ...data, userId: user.value.id }
    const res = await updateProfile(payload)
    user.value = res.data
    setItem(USER_KEY, user.value)
    return res.data
  }

  return {
    token,
    user,
    isLoggedIn,
    displayName,
    login,
    logout,
    fetchProfile,
    saveProfile,
  }
})
