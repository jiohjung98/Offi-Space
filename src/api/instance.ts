import { toast } from 'react-toastify';
import axios, {
  Axios,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse
} from 'axios';

import { getCookie } from '@utils/cookies';
import logOnDev from '@utils/logOnDev';

export const instance: Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*'
  },
  timeout: 3000
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getCookie('token') as string;
    if (config && config.headers) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (process.env.NODE_ENV === 'development') {
      const { method, url } = config;
      logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);
    }
    return config;
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    if (process.env.NODE_ENV === 'development') {
      if (axios.isAxiosError(error)) {
        const { message } = error;
        const { method, url } = error.config as InternalAxiosRequestConfig;
        const { status, statusText } = error.response as AxiosResponse;
        logOnDev(
          `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`
        );
        switch (status) {
          case 401: {
            toast.error('로그인이 필요합니다');
            break;
          }
          case 403: {
            toast.error('잘못된 권한입니다');
            break;
          }
          case 404: {
            toast.error('잘못된 요청입니다');
            break;
          }
          case 500: {
            toast.error('서버 에러 발생');
            break;
          }
          default: {
            toast.error('알 수 없는 오류 발생');
            break;
          }
        }
      } else {
        logOnDev(`🚨 [API] | Error ${error.message}`);
      }
    }
    return Promise.reject(error);
  }
);
