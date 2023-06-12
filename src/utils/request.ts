// import { storage } from '@/store/storage';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { constants } from 'buffer';
import router from '../router';
import { message } from './index';
const errorHandle = (status: number, other: any) => {
  switch (status) {
    case 400:
      message({ message: '请求错误(400)', type: 'error' });

      break;
    case 401:
      message({ message: '请求错误(401)', type: 'error' });
      // router.push('/login');
      // localStorage.removeItem('mallos-token');
      break;
    case 403:
      message({ message: '拒绝访问(403)', type: 'error' });
      break;
    case 404:
      message({ message: '请求出错(404)', type: 'error' });
      break;
    case 408:
      message({ message: '请求超时(408)', type: 'error' });
      break;
    case 500:
      message({ message: '服务器错误(500)', type: 'error' });
      break;
    case 501:
      message({ message: '服务未实现(501)', type: 'error' });
      break;
    case 502:
      message({ message: '网络错误(502)', type: 'error' });
      break;
    case 503:
      message({ message: '服务不可用(503)', type: 'error' });
      break;
    case 504:
      message({ message: '网络超时(504)', type: 'error' });
      break;
    case 505:
      message({ message: 'HTTP版本不受支持(505)', type: 'error' });
      break;
    default:
      message({ message: other, type: 'error' });
  }
};

const instance = axios.create({
  baseURL: '/',
  timeout: 30000,
  withCredentials: false,
  headers: {
    token: '',
  },
});
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something
    // const token = storage.getToken();
    // config.headers['token'] = token;
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);
instance.interceptors.response.use(
  async (res: AxiosResponse) => {
    if (res.headers['content-type'] === 'application/octet-stream') {
      return Promise.resolve(res);
    } else if (res.status === 200) {
      if (res.data?.code === 200) {
        return (res.data.data??'') == ''
            ? Promise.resolve(1)
            : Promise.resolve(res.data.data);
      } else {
        message({ message: res.data?.msg, type: 'error' });
        return Promise.reject(res);
      }
    } else if (res.request.responseType === 'blob') {
      if (res.headers['content-type'] === 'application/json') {
        if (!res.headers.msg || res.headers.msg === '') {
          message({
            message: 'unknown exception, please contact administrator',
            type: 'error',
          });
        } else {
          message({
            message: decodeURIComponent(res.headers.msg),
            type: 'error',
          });
        }
        return Promise.reject(res);
      }
      return Promise.resolve(res);
    } else {
      console.log('gff');
      message({
        message: res.data?.msg || '接口请求出错',
        type: 'error',
      });
      return Promise.reject(res);
    }
  },
  (error: any) => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;
