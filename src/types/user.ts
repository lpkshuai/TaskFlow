export type UserRole = "admin" | "user";

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  createdAt: string;
}

/** 带密码的内部用户，仅 mock 使用 */
export interface UserRecord extends User {
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: User;
}

export interface UpdateProfilePayload {
  userId: string;
  name?: string;
  email?: string;
}
