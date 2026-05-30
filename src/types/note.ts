import type { NoteCategory } from "@/utils/constants";

export interface Note {
  id: string;
  title: string;
  content: string;
  category: NoteCategory;
  isPinned: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export type NotePayload = Omit<Note, "id" | "createdAt" | "updatedAt">;

export interface NoteQuery {
  keyword?: string;
  category?: NoteCategory | "";
  page?: number;
  pageSize?: number;
}
