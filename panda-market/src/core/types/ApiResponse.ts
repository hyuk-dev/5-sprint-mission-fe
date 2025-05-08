export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  nextCursor?: number;
}

export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  message: string | Record<string, string[]>;
  timestamp: string;
}