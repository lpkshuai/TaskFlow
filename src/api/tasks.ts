import { request } from "./index";
import type { PaginatedResult, SuccessResult } from "@/types/api";
import type {
  DashboardStats,
  Task,
  TaskPayload,
  TaskQuery,
} from "@/types/task";

export function fetchTasks(params?: TaskQuery) {
  return request.get<PaginatedResult<Task>>("/tasks", params);
}

export function fetchTaskById(id: string) {
  return request.get<Task>(`/tasks/${id}`);
}

export function createTask(data: TaskPayload) {
  return request.post<Task>("/tasks", data);
}

export function updateTask(id: string, data: Partial<TaskPayload>) {
  return request.put<Task>(`/tasks/${id}`, data);
}

export function deleteTask(id: string) {
  return request.delete<SuccessResult>(`/tasks/${id}`);
}

export function fetchDashboardStats() {
  return request.get<DashboardStats>("/dashboard/stats");
}
