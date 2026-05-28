<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import BaseButton from '@/components/common/BaseButton.vue'

const appStore = useAppStore()

const settings = ref({
  sidebarCollapsed: appStore.sidebarCollapsed,
  pageSize: 10,
  theme: 'light',
})

watch(
  () => settings.value.sidebarCollapsed,
  (val) => {
    if (val !== appStore.sidebarCollapsed) {
      appStore.toggleSidebar()
    }
  }
)

const saved = ref(false)

function handleSave() {
  saved.value = true
  setTimeout(() => { saved.value = false }, 2000)
}
</script>

<template>
  <div class="settings">
    <div class="settings__section">
      <h3>界面设置</h3>
      <label class="settings__item">
        <span>默认折叠侧边栏</span>
        <input v-model="settings.sidebarCollapsed" type="checkbox" />
      </label>
      <label class="settings__item">
        <span>每页条数</span>
        <select v-model="settings.pageSize">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </label>
      <label class="settings__item">
        <span>主题</span>
        <select v-model="settings.theme">
          <option value="light">浅色</option>
          <option value="dark">深色（演示）</option>
        </select>
      </label>
    </div>

    <div class="settings__section">
      <h3>关于项目</h3>
      <p class="settings__desc">
        这是一个 Vue 3 + JavaScript 练习项目，涵盖路由、Pinia、组件化、Mock API、
        Composables、自定义指令等常见功能，适合作为 JS 转 TS 的练习素材。
      </p>
    </div>

    <div class="settings__actions">
      <BaseButton type="primary" @click="handleSave">保存设置</BaseButton>
      <span v-if="saved" class="settings__saved">已保存</span>
    </div>
  </div>
</template>

<style scoped>
.settings { max-width: 560px; }
.settings__section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-bottom: 16px;
}
.settings__section h3 { margin: 0 0 16px; font-size: 16px; }
.settings__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
}
.settings__item:last-child { border-bottom: none; }
.settings__desc { margin: 0; font-size: 14px; line-height: 1.7; color: var(--text-secondary); }
.settings__actions { display: flex; align-items: center; gap: 12px; }
.settings__saved { font-size: 13px; color: var(--success); }
</style>
