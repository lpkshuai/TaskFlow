import axios, { type AxiosError } from "axios";
import { mockApi } from "./mock";
import { TOKEN_KEY } from "@/utils/constants";
import { getItem } from "@/utils/storage";
import type { ApiResponse } from "@/types/api";
import type { NotePayload, NoteQuery } from "@/types/note";
import type { TaskPayload, TaskQuery } from "@/types/task";
import type { LoginCredentials, User } from "@/types/user";

const USE_MOCK = true;

const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  const token = getItem(TOKEN_KEY, "");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message || error.message || "请求失败";
    return Promise.reject(new Error(message));
  },
);

async function mockRequest<T>(
  handler: () => Promise<T>,
): Promise<ApiResponse<T>> {
  try {
    const data = await handler();
    return { code: 0, data, message: "ok" };
  } catch (err) {
    return Promise.reject(err);
  }
}

export const request = {
  get<T>(
    url: string,
    params?: unknown,
  ): Promise<ApiResponse<T>> {
    if (USE_MOCK) return routeMockGet<T>(url, params);
    return instance.get(url, { params });
  },
  post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    if (USE_MOCK) return routeMockPost<T>(url, data);
    return instance.post(url, data);
  },
  put<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    if (USE_MOCK) return routeMockPut<T>(url, data);
    return instance.put(url, data);
  },
  delete<T>(url: string): Promise<ApiResponse<T>> {
    if (USE_MOCK) return routeMockDelete<T>(url);
    return instance.delete(url);
  },
};

function routeMockGet<T>(
  url: string,
  params: unknown = {},
): Promise<ApiResponse<T>> {
  if (url === "/auth/profile") {
    const payload = params as { userId: string };
    return mockRequest(() => mockApi.getProfile(payload.userId)) as Promise<ApiResponse<T>>;
  }
  if (url === "/users") {
    return mockRequest(() => mockApi.getUsers()) as Promise<ApiResponse<T>>;
  }
  if (url === "/tasks") {
    return mockRequest(() => mockApi.getTasks(params as TaskQuery)) as Promise<ApiResponse<T>>;
  }
  if (url.startsWith("/tasks/")) {
    const id = url.split("/")[2];
    return mockRequest(() => mockApi.getTaskById(id)) as Promise<ApiResponse<T>>;
  }
  if (url === "/notes") {
    return mockRequest(() => mockApi.getNotes(params as NoteQuery)) as Promise<ApiResponse<T>>;
  }
  if (url.startsWith("/notes/")) {
    const id = url.split("/")[2];
    return mockRequest(() => mockApi.getNoteById(id)) as Promise<ApiResponse<T>>;
  }
  if (url === "/dashboard/stats") {
    return mockRequest(() => mockApi.getDashboardStats()) as Promise<ApiResponse<T>>;
  }
  return Promise.reject(new Error(`Mock GET 未实现: ${url}`));
}
function routeMockPost<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
  if (url === "/auth/login") {
    return mockRequest(() =>
      mockApi.login(data as LoginCredentials),
    ) as Promise<ApiResponse<T>>;
  }
  if (url === "/tasks") {
    return mockRequest(() => mockApi.createTask(data as TaskPayload)) as Promise<ApiResponse<T>>;
  }
  if (url === "/notes") {
    return mockRequest(() => mockApi.createNote(data as NotePayload)) as Promise<ApiResponse<T>>;
  }
  return Promise.reject(new Error(`Mock POST 未实现: ${url}`));
}
function routeMockPut<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
  if (url === "/auth/profile") {
    const payload = data as { userId: string };
    return mockRequest(() =>
      mockApi.updateProfile(
        payload.userId,
        data as Partial<Pick<User, "name" | "email" | "avatar">>,
      ),
    ) as Promise<ApiResponse<T>>;
  }
  if (url.startsWith("/tasks/")) {
    const id = url.split("/")[2];
    return mockRequest(() =>
      mockApi.updateTask(id, data as Partial<TaskPayload>),
    ) as Promise<ApiResponse<T>>;
  }
  if (url.startsWith("/notes/")) {
    const id = url.split("/")[2];
    return mockRequest(() =>
      mockApi.updateNote(id, data as Partial<NotePayload>),
    ) as Promise<ApiResponse<T>>;
  }
  return Promise.reject(new Error(`Mock PUT 未实现: ${url}`));
}
function routeMockDelete<T>(url: string): Promise<ApiResponse<T>> {
  if (url.startsWith("/tasks/")) {
    const id = url.split("/")[2];
    return mockRequest(() => mockApi.deleteTask(id)) as Promise<ApiResponse<T>>;
  }
  if (url.startsWith("/notes/")) {
    const id = url.split("/")[2];
    return mockRequest(() => mockApi.deleteNote(id)) as Promise<ApiResponse<T>>;
  }
  return Promise.reject(new Error(`Mock DELETE 未实现: ${url}`));
}
