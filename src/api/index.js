import axios from 'axios'
import { mockApi } from './mock'
import { TOKEN_KEY } from '@/utils/constants'
import { getItem } from '@/utils/storage'

const USE_MOCK = true

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  const token = getItem(TOKEN_KEY, '')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || '请求失败'
    return Promise.reject(new Error(message))
  }
)

async function mockRequest(handler) {
  try {
    const data = await handler()
    return { code: 0, data, message: 'ok' }
  } catch (err) {
    return Promise.reject(err)
  }
}

export const request = {
  get(url, params) {
    if (USE_MOCK) return routeMockGet(url, params)
    return instance.get(url, { params })
  },
  post(url, data) {
    if (USE_MOCK) return routeMockPost(url, data)
    return instance.post(url, data)
  },
  put(url, data) {
    if (USE_MOCK) return routeMockPut(url, data)
    return instance.put(url, data)
  },
  delete(url) {
    if (USE_MOCK) return routeMockDelete(url)
    return instance.delete(url)
  },
}

function routeMockGet(url, params) {
  if (url === '/auth/profile') return mockRequest(() => mockApi.getProfile(params.userId))
  if (url === '/users') return mockRequest(() => mockApi.getUsers())
  if (url === '/tasks') return mockRequest(() => mockApi.getTasks(params))
  if (url.startsWith('/tasks/')) {
    const id = url.split('/')[2]
    return mockRequest(() => mockApi.getTaskById(id))
  }
  if (url === '/notes') return mockRequest(() => mockApi.getNotes(params))
  if (url.startsWith('/notes/')) {
    const id = url.split('/')[2]
    return mockRequest(() => mockApi.getNoteById(id))
  }
  if (url === '/dashboard/stats') return mockRequest(() => mockApi.getDashboardStats())
  return Promise.reject(new Error(`Mock GET 未实现: ${url}`))
}

function routeMockPost(url, data) {
  if (url === '/auth/login') return mockRequest(() => mockApi.login(data))
  if (url === '/tasks') return mockRequest(() => mockApi.createTask(data))
  if (url === '/notes') return mockRequest(() => mockApi.createNote(data))
  return Promise.reject(new Error(`Mock POST 未实现: ${url}`))
}

function routeMockPut(url, data) {
  if (url === '/auth/profile') return mockRequest(() => mockApi.updateProfile(data.userId, data))
  if (url.startsWith('/tasks/')) {
    const id = url.split('/')[2]
    return mockRequest(() => mockApi.updateTask(id, data))
  }
  if (url.startsWith('/notes/')) {
    const id = url.split('/')[2]
    return mockRequest(() => mockApi.updateNote(id, data))
  }
  return Promise.reject(new Error(`Mock PUT 未实现: ${url}`))
}

function routeMockDelete(url) {
  if (url.startsWith('/tasks/')) {
    const id = url.split('/')[2]
    return mockRequest(() => mockApi.deleteTask(id))
  }
  if (url.startsWith('/notes/')) {
    const id = url.split('/')[2]
    return mockRequest(() => mockApi.deleteNote(id))
  }
  return Promise.reject(new Error(`Mock DELETE 未实现: ${url}`))
}
