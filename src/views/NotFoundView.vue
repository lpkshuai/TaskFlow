<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'

const router = useRouter()
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在</p>
    <BaseButton type="primary" @click="router.push('/dashboard')">返回首页</BaseButton>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 80px 20px;
}
.not-found h1 {
  font-size: 72px;
  margin: 0;
  color: var(--primary);
}
.not-found p {
  color: var(--text-secondary);
  margin: 12px 0 24px;
}
</style>
