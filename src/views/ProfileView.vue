<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

const userStore = useUserStore()

const form = ref({
  name: '',
  email: '',
})
const loading = ref(false)
const message = ref('')

onMounted(() => {
  if (userStore.user) {
    form.value = {
      name: userStore.user.name,
      email: userStore.user.email,
    }
  }
})

async function handleSave() {
  loading.value = true
  message.value = ''
  try {
    await userStore.saveProfile(form.value)
    message.value = '保存成功'
  } catch (err) {
    message.value = err.message || '保存失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="profile">
    <div class="profile__card">
      <div class="profile__avatar">{{ userStore.displayName.charAt(0) }}</div>
      <div class="profile__info">
        <h2>{{ userStore.displayName }}</h2>
        <StatusBadge :status="userStore.user?.role" />
        <p class="profile__username">@{{ userStore.user?.username }}</p>
      </div>
    </div>

    <div class="profile__form">
      <h3>编辑资料</h3>
      <BaseInput v-model="form.name" label="姓名" />
      <BaseInput v-model="form.email" label="邮箱" type="email" />
      <p v-if="message" class="profile__message" :class="{ error: message.includes('失败') }">
        {{ message }}
      </p>
      <BaseButton type="primary" :loading="loading" @click="handleSave">保存修改</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.profile { max-width: 560px; }
.profile__card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 24px;
}
.profile__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
}
.profile__info h2 { margin: 0 0 8px; }
.profile__username { margin: 8px 0 0; color: var(--text-secondary); font-size: 14px; }
.profile__form {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.profile__form h3 { margin: 0; font-size: 16px; }
.profile__message { font-size: 13px; color: var(--success); margin: 0; }
.profile__message.error { color: var(--danger); }
</style>
