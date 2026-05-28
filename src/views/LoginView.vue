<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const form = ref({ username: 'admin', password: '123456' })
const errors = ref({})
const loading = ref(false)
const loginError = ref('')

async function handleLogin() {
  errors.value = {}
  loginError.value = ''
  if (!form.value.username) errors.value.username = '请输入用户名'
  if (!form.value.password) errors.value.password = '请输入密码'
  if (Object.keys(errors.value).length) return

  loading.value = true
  try {
    await userStore.login(form.value)
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } catch (err) {
    loginError.value = err.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-card__header">
        <span class="login-card__logo">⚡</span>
        <h1>TaskFlow</h1>
        <p>Vue3 练习项目 — 任务与笔记管理平台</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <BaseInput
          v-model="form.username"
          label="用户名"
          placeholder="admin / demo"
          :error="errors.username"
        />
        <BaseInput
          v-model="form.password"
          label="密码"
          type="password"
          placeholder="123456"
          :error="errors.password"
        />
        <p v-if="loginError" class="login-error">{{ loginError }}</p>
        <BaseButton type="primary" block :loading="loading" @click="handleLogin">
          登录
        </BaseButton>
      </form>

      <div class="login-hint">
        <p>演示账号：</p>
        <p>admin / 123456（管理员）</p>
        <p>demo / 123456（普通用户）</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}
.login-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-lg);
}
.login-card__header { text-align: center; margin-bottom: 32px; }
.login-card__logo { font-size: 48px; }
.login-card__header h1 { margin: 8px 0 4px; font-size: 28px; }
.login-card__header p { margin: 0; color: var(--text-secondary); font-size: 14px; }
.login-form { display: flex; flex-direction: column; gap: 16px; }
.login-error { color: var(--danger); font-size: 13px; margin: 0; text-align: center; }
.login-hint {
  margin-top: 24px;
  padding: 12px;
  background: var(--bg-hover);
  border-radius: var(--radius);
  font-size: 13px;
  color: var(--text-secondary);
}
.login-hint p { margin: 4px 0; }
</style>
