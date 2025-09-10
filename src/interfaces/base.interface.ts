export interface BaseResponse<T> {
  statusCode: number;
  message: string;
  timeStamp: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface BasePaginatedResponse<T> {
  message: string;
  statusCode: number;
  timeStamp: string;
  data: {
    entities: T[];
    meta: PaginationMeta;
  };
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
