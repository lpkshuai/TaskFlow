import { generateId } from '@/utils/format'
import { TASK_PRIORITY, TASK_STATUS } from '@/utils/constants'

const users = [
  {
    id: 'user_1',
    username: 'admin',
    password: '123456',
    name: '管理员',
    email: 'admin@taskflow.com',
    avatar: '',
    role: 'admin',
    createdAt: '2025-01-01T08:00:00.000Z',
  },
  {
    id: 'user_2',
    username: 'demo',
    password: '123456',
    name: '演示用户',
    email: 'demo@taskflow.com',
    avatar: '',
    role: 'user',
    createdAt: '2025-02-15T08:00:00.000Z',
  },
]

let tasks = [
  {
    id: 'task_1',
    title: '完成项目需求文档',
    description: '整理功能清单、接口定义和页面原型说明',
    status: TASK_STATUS.IN_PROGRESS,
    priority: TASK_PRIORITY.HIGH,
    assigneeId: 'user_1',
    dueDate: '2026-06-01',
    tags: ['文档', '需求'],
    createdAt: '2026-05-10T09:00:00.000Z',
    updatedAt: '2026-05-20T14:30:00.000Z',
  },
  {
    id: 'task_2',
    title: '实现用户登录模块',
    description: '包含登录、登出、路由守卫和 Token 持久化',
    status: TASK_STATUS.DONE,
    priority: TASK_PRIORITY.HIGH,
    assigneeId: 'user_1',
    dueDate: '2026-05-25',
    tags: ['认证', '前端'],
    createdAt: '2026-05-01T10:00:00.000Z',
    updatedAt: '2026-05-18T16:00:00.000Z',
  },
  {
    id: 'task_3',
    title: '设计任务列表页面',
    description: '支持搜索、筛选、分页和批量操作',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    assigneeId: 'user_2',
    dueDate: '2026-06-10',
    tags: ['UI', '列表'],
    createdAt: '2026-05-12T11:00:00.000Z',
    updatedAt: '2026-05-12T11:00:00.000Z',
  },
  {
    id: 'task_4',
    title: '编写单元测试',
    description: '覆盖 store、utils 和关键组件',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.LOW,
    assigneeId: 'user_2',
    dueDate: '2026-06-20',
    tags: ['测试'],
    createdAt: '2026-05-15T08:30:00.000Z',
    updatedAt: '2026-05-15T08:30:00.000Z',
  },
  {
    id: 'task_5',
    title: '优化移动端适配',
    description: '调整侧边栏、表格和表单在小屏下的布局',
    status: TASK_STATUS.IN_PROGRESS,
    priority: TASK_PRIORITY.MEDIUM,
    assigneeId: 'user_1',
    dueDate: '2026-06-05',
    tags: ['响应式'],
    createdAt: '2026-05-18T13:00:00.000Z',
    updatedAt: '2026-05-22T09:15:00.000Z',
  },
]

let notes = [
  {
    id: 'note_1',
    title: 'Vue3 组合式 API 笔记',
    content: 'ref 用于基本类型，reactive 用于对象。computed 和 watch 的使用场景需要注意依赖追踪。',
    category: '学习',
    isPinned: true,
    authorId: 'user_1',
    createdAt: '2026-05-01T10:00:00.000Z',
    updatedAt: '2026-05-10T15:00:00.000Z',
  },
  {
    id: 'note_2',
    title: 'Pinia 状态管理要点',
    content: 'store 按模块拆分，actions 处理异步，getters 做派生状态。持久化可结合 localStorage。',
    category: '学习',
    isPinned: false,
    authorId: 'user_1',
    createdAt: '2026-05-05T09:00:00.000Z',
    updatedAt: '2026-05-05T09:00:00.000Z',
  },
  {
    id: 'note_3',
    title: '周会纪要 5/20',
    content: '1. 完成登录模块\n2. 任务列表进入开发\n3. 下周进行 Code Review',
    category: '工作',
    isPinned: false,
    authorId: 'user_2',
    createdAt: '2026-05-20T16:00:00.000Z',
    updatedAt: '2026-05-20T16:00:00.000Z',
  },
]

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function paginate(list, page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize
  return {
    list: list.slice(start, start + pageSize),
    total: list.length,
    page,
    pageSize,
  }
}

function filterTasks(params = {}) {
  let result = [...tasks]
  const { keyword, status, priority, assigneeId } = params

  if (keyword) {
    const kw = keyword.toLowerCase()
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(kw) ||
        t.description.toLowerCase().includes(kw) ||
        t.tags.some((tag) => tag.toLowerCase().includes(kw))
    )
  }
  if (status) result = result.filter((t) => t.status === status)
  if (priority) result = result.filter((t) => t.priority === priority)
  if (assigneeId) result = result.filter((t) => t.assigneeId === assigneeId)

  result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
  return result
}

function filterNotes(params = {}) {
  let result = [...notes]
  const { keyword, category } = params

  if (keyword) {
    const kw = keyword.toLowerCase()
    result = result.filter(
      (n) => n.title.toLowerCase().includes(kw) || n.content.toLowerCase().includes(kw)
    )
  }
  if (category) result = result.filter((n) => n.category === category)

  result.sort((a, b) => {
    if (a.isPinned !== b.isPinned) return b.isPinned - a.isPinned
    return new Date(b.updatedAt) - new Date(a.updatedAt)
  })
  return result
}

export const mockApi = {
  async login({ username, password }) {
    await delay(600)
    const user = users.find((u) => u.username === username && u.password === password)
    if (!user) {
      const err = new Error('用户名或密码错误')
      err.code = 401
      throw err
    }
    const { password: _, ...safeUser } = user
    return {
      token: `mock_token_${user.id}_${Date.now()}`,
      user: safeUser,
    }
  },

  async getProfile(userId) {
    await delay(300)
    const user = users.find((u) => u.id === userId)
    if (!user) throw new Error('用户不存在')
    const { password: _, ...safeUser } = user
    return safeUser
  },

  async updateProfile(userId, data) {
    await delay(400)
    const index = users.findIndex((u) => u.id === userId)
    if (index === -1) throw new Error('用户不存在')
    users[index] = { ...users[index], ...data, id: userId }
    const { password: _, ...safeUser } = users[index]
    return safeUser
  },

  async getUsers() {
    await delay(200)
    return users.map(({ password, ...u }) => u)
  },

  async getTasks(params = {}) {
    await delay(500)
    const filtered = filterTasks(params)
    const { page = 1, pageSize = 10 } = params
    return paginate(filtered, page, pageSize)
  },

  async getTaskById(id) {
    await delay(300)
    const task = tasks.find((t) => t.id === id)
    if (!task) throw new Error('任务不存在')
    return task
  },

  async createTask(data) {
    await delay(400)
    const task = {
      id: generateId('task'),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    tasks.unshift(task)
    return task
  },

  async updateTask(id, data) {
    await delay(400)
    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) throw new Error('任务不存在')
    tasks[index] = {
      ...tasks[index],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    }
    return tasks[index]
  },

  async deleteTask(id) {
    await delay(300)
    const index = tasks.findIndex((t) => t.id === id)
    if (index === -1) throw new Error('任务不存在')
    tasks.splice(index, 1)
    return { success: true }
  },

  async getNotes(params = {}) {
    await delay(400)
    const filtered = filterNotes(params)
    const { page = 1, pageSize = 10 } = params
    return paginate(filtered, page, pageSize)
  },

  async getNoteById(id) {
    await delay(300)
    const note = notes.find((n) => n.id === id)
    if (!note) throw new Error('笔记不存在')
    return note
  },

  async createNote(data) {
    await delay(400)
    const note = {
      id: generateId('note'),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    notes.unshift(note)
    return note
  },

  async updateNote(id, data) {
    await delay(400)
    const index = notes.findIndex((n) => n.id === id)
    if (index === -1) throw new Error('笔记不存在')
    notes[index] = {
      ...notes[index],
      ...data,
      id,
      updatedAt: new Date().toISOString(),
    }
    return notes[index]
  },

  async deleteNote(id) {
    await delay(300)
    const index = notes.findIndex((n) => n.id === id)
    if (index === -1) throw new Error('笔记不存在')
    notes.splice(index, 1)
    return { success: true }
  },

  async getDashboardStats() {
    await delay(350)
    const taskStats = {
      total: tasks.length,
      todo: tasks.filter((t) => t.status === TASK_STATUS.TODO).length,
      inProgress: tasks.filter((t) => t.status === TASK_STATUS.IN_PROGRESS).length,
      done: tasks.filter((t) => t.status === TASK_STATUS.DONE).length,
    }
    const noteStats = {
      total: notes.length,
      pinned: notes.filter((n) => n.isPinned).length,
    }
    const recentTasks = [...tasks]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)
    const recentNotes = [...notes]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5)

    return { taskStats, noteStats, recentTasks, recentNotes }
  },
}
