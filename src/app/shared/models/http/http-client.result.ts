export interface HttpClientResult<T> {
  isSuccess: boolean;
  data?: T;
  errorKey?: string;
  errorStatusCode?: number;
  errorMessage?: string;
}
