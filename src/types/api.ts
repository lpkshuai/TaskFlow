export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

export interface PaginatedResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SuccessResult {
  success: boolean;
}
