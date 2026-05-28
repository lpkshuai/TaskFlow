import { request } from './index'

export function login(credentials) {
  return request.post('/auth/login', credentials)
}

export function getProfile(userId) {
  return request.get('/auth/profile', { userId })
}

export function updateProfile(data) {
  return request.put('/auth/profile', data)
}

export function getUsers() {
  return request.get('/users')
}
