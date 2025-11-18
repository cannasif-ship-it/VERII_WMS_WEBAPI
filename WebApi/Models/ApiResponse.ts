// ==========================
// ApiResponse<T>
// ==========================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  exceptionMessage: string;
  data?: T | null;
  errors: string[];
  timestamp: string; // ISO date string
  statusCode: number;
  className: string;
}

// Generic type display (C# için hazırlanmış halin sade TS versiyonu)
function getGenericTypeDisplayName(type: any): string {
  if (typeof type === "string") return type;
  if (typeof type === "function") return type.name;
  return "T";
}

// SuccessResult
export function successResult<T>(data: T, message: string): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    statusCode: 200,
    timestamp: new Date().toISOString(),
    exceptionMessage: "",
    errors: [],
    className: `ApiResponse<${getGenericTypeDisplayName(typeof data)}>`,
  };
}

// ErrorResult
export function errorResult<T>(
  message: string,
  exceptionMessage: string = "",
  statusCode: number = 500,
  error?: string
): ApiResponse<T> {
  return {
    success: false,
    message,
    exceptionMessage,
    statusCode,
    data: null,
    timestamp: new Date().toISOString(),
    errors: error ? [error] : [],
    className: `ApiResponse<T>`,
  };
}

// ==========================
// PagedResponse<T>
// ==========================

export interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// ==========================
// PagedResult<T>
// ==========================

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
