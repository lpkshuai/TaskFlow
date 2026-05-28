import { request } from './index'

export function fetchNotes(params) {
  return request.get('/notes', params)
}

export function fetchNoteById(id) {
  return request.get(`/notes/${id}`)
}

export function createNote(data) {
  return request.post('/notes', data)
}

export function updateNote(id, data) {
  return request.put(`/notes/${id}`, data)
}

export function deleteNote(id) {
  return request.delete(`/notes/${id}`)
}
