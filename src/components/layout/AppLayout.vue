<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import BaseButton from '@/components/common/BaseButton.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

const navItems = [
  { path: '/dashboard', icon: '📊', label: '仪表盘' },
  { path: '/tasks', icon: '✅', label: '任务管理' },
  { path: '/notes', icon: '📝', label: '笔记管理' },
  { path: '/profile', icon: '👤', label: '个人资料' },
  { path: '/settings', icon: '⚙️', label: '系统设置' },
]

const pageTitle = computed(() => route.meta.title || 'TaskFlow')

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/')
}

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="layout" :class="{ 'layout--collapsed': appStore.sidebarCollapsed }">
    <aside class="sidebar">
      <div class="sidebar__brand">
        <span class="sidebar__logo">⚡</span>
        <span v-show="!appStore.sidebarCollapsed" class="sidebar__name">TaskFlow</span>
      </div>
      <nav class="sidebar__nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="sidebar__link"
          :class="{ 'sidebar__link--active': isActive(item.path) }"
        >
          <span class="sidebar__icon">{{ item.icon }}</span>
          <span v-show="!appStore.sidebarCollapsed">{{ item.label }}</span>
        </router-link>
      </nav>
    </aside>

    <div class="main">
      <header class="header">
        <button class="header__toggle" @click="appStore.toggleSidebar()">☰</button>
        <h1 class="header__title">{{ pageTitle }}</h1>
        <div class="header__actions">
          <span class="header__user">{{ userStore.displayName }}</span>
          <BaseButton type="ghost" size="sm" @click="handleLogout">退出</BaseButton>
        </div>
      </header>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: width 0.2s;
  flex-shrink: 0;
}

.layout--collapsed .sidebar {
  width: var(--sidebar-collapsed-width);
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  border-bottom: 1px solid var(--border);
}

.sidebar__logo { font-size: 24px; }
.sidebar__name { font-size: 18px; font-weight: 700; color: var(--primary); white-space: nowrap; }

.sidebar__nav {
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  white-space: nowrap;
}

.sidebar__link:hover { background: var(--bg-hover); color: var(--text); }
.sidebar__link--active {
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 500;
}

.sidebar__icon { font-size: 18px; width: 24px; text-align: center; }

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  height: var(--header-height);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
}

.header__toggle {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius);
}
.header__toggle:hover { background: var(--bg-hover); }

.header__title {
  flex: 1;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__user {
  font-size: 14px;
  color: var(--text-secondary);
}

.content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .sidebar { position: fixed; z-index: 100; height: 100vh; }
  .layout--collapsed .sidebar { transform: translateX(-100%); width: var(--sidebar-width); }
  .content { padding: 16px; }
}
</style>
