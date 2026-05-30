import { request } from "./index";
import type { PaginatedResult, SuccessResult } from "@/types/api";
import type { Note, NotePayload, NoteQuery } from "@/types/note";

export function fetchNotes(params?: NoteQuery) {
  return request.get<PaginatedResult<Note>>("/notes", params);
}

export function fetchNoteById(id: string) {
  return request.get<Note>(`/notes/${id}`);
}

export function createNote(data: NotePayload) {
  return request.post<Note>("/notes", data);
}

export function updateNote(id: string, data: Partial<NotePayload>) {
  return request.put<Note>(`/notes/${id}`, data);
}

export function deleteNote(id: string) {
  return request.delete<SuccessResult>(`/notes/${id}`);
}
