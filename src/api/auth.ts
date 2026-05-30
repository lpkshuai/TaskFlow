import { request } from "./index";
import type { ApiResponse } from "@/types/api";
import type {
  LoginCredentials,
  LoginResult,
  UpdateProfilePayload,
  User,
} from "@/types/user";

export function login(credentials: LoginCredentials) {
  return request.post<LoginResult>("/auth/login", credentials);
}

export function getProfile(userId: string) {
  return request.get<User>("/auth/profile", { userId });
}

export function updateProfile(data: UpdateProfilePayload) {
  return request.put<User>("/auth/profile", data);
}

export function getUsers() {
  return request.get<User[]>("/users");
}
