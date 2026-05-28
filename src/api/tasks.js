import { request } from './index'

export function fetchTasks(params) {
  return request.get('/tasks', params)
}

export function fetchTaskById(id) {
  return request.get(`/tasks/${id}`)
}

export function createTask(data) {
  return request.post('/tasks', data)
}

export function updateTask(id, data) {
  return request.put(`/tasks/${id}`, data)
}

export function deleteTask(id) {
  return request.delete(`/tasks/${id}`)
}

export function fetchDashboardStats() {
  return request.get('/dashboard/stats')
}
