export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
} as const;
export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: "待办",
  [TASK_STATUS.IN_PROGRESS]: "进行中",
  [TASK_STATUS.DONE]: "已完成",
} as const satisfies Record<TaskStatus, string>;
// export type TaskStatusLabels =
//   (typeof TASK_STATUS_LABELS)[keyof typeof TASK_STATUS_LABELS];

export const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;
export type TaskPriority = (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: "低",
  [TASK_PRIORITY.MEDIUM]: "中",
  [TASK_PRIORITY.HIGH]: "高",
} as const satisfies Record<TaskPriority, string>;
// export type TaskPriorityLabels =
//   (typeof TASK_PRIORITY_LABELS)[keyof typeof TASK_PRIORITY_LABELS];

export const NOTE_CATEGORIES = ["工作", "学习", "生活", "其他"] as const;
export type NoteCategory = (typeof NOTE_CATEGORIES)[number];

export const TOKEN_KEY = "taskflow_token";
export const USER_KEY = "taskflow_user";

export const DEFAULT_PAGE_SIZE = 10;
