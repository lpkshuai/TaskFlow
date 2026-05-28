# TaskFlow — Vue3 + JS 练习项目

一个功能较完整的小型 Vue 3 项目，适合作为 **JavaScript 转 TypeScript** 的练习素材。

## 技术栈

- Vue 3（组合式 API + `<script setup>`）
- Vue Router（路由守卫、懒加载、嵌套路由）
- Pinia（多模块状态管理）
- Axios + Mock API（模拟接口延迟与 CRUD）
- Vite

## 功能模块

| 模块 | 说明 |
|------|------|
| 登录/登出 | Token 持久化、路由守卫 |
| 仪表盘 | 任务/笔记统计数据、最近动态 |
| 任务管理 | 列表、搜索、筛选、分页、CRUD、详情 |
| 笔记管理 | 卡片列表、分类筛选、置顶、CRUD、详情 |
| 个人资料 | 查看与编辑用户信息 |
| 系统设置 | 界面偏好（演示） |

## 项目结构

```
src/
├── api/           # 接口层（axios 封装 + mock 数据）
├── components/    # 通用组件 + 业务组件
│   ├── common/    # Button、Modal、Input、Pagination 等
│   ├── layout/    # 布局（侧边栏 + 顶栏）
│   ├── task/      # 任务表单
│   └── note/      # 笔记表单
├── composables/   # 组合式函数（useAsync、usePagination、useDebounce）
├── directives/    # 自定义指令（v-loading）
├── router/        # 路由配置与守卫
├── stores/        # Pinia stores（user、tasks、notes、app）
├── utils/         # 工具函数与常量
└── views/         # 页面视图
```

## 快速开始

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 演示账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin  | 123456 | 管理员 |
| demo   | 123456 | 普通用户 |

## JS → TS 迁移建议

按以下顺序逐步迁移，难度由低到高：

1. `utils/` — 纯函数，先加类型注解
2. `api/` — 定义请求/响应接口类型
3. `stores/` — Pinia 配合 TS 的类型推导
4. `composables/` — 泛型与返回值类型
5. `components/` — Props / Emits 类型声明
6. `router/` — 路由 meta 类型扩展
7. 全局配置 — `tsconfig.json`、`env.d.ts`、Vite 别名

## 构建

```bash
npm run build
npm run preview
```
