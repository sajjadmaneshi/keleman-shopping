export interface HttpClientResult<T> {
  statusCode: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 405 | 500 | 502;
  message: string;
  isError: boolean;
  result?: T;
  responseException?: { exceptionMessage: string };
}
