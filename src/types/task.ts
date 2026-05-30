import type { TaskPriority, TaskStatus } from "@/utils/constants";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  dueDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/** 创建/更新时提交的字段（无 id、时间戳） */
export type TaskPayload = Omit<Task, "id" | "createdAt" | "updatedAt">;

export interface TaskQuery {
  keyword?: string;
  status?: TaskStatus | "";
  priority?: TaskPriority | "";
  assigneeId?: string;
  page?: number;
  pageSize?: number;
}

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}

export interface DashboardStats {
  taskStats: TaskStats;
  noteStats: { total: number; pinned: number };
  recentTasks: Task[];
  recentNotes: import("./note").Note[];
}
