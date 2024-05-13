export interface ICommon<T> {
  status: string;
  errorCode: string;
  message: string;
  data: T;
}
