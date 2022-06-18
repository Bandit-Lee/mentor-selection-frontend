import type { ResultVO } from '@/datasources/Type';
import { useGlobelStore } from '@/stores/store';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use(
  (req) => {
    const token = sessionStorage.getItem('token');
    // 如果token不为空,并且request的headers不为空
    if (token && req.headers) {
      req.headers.token = token;
    }
    return req;
  },
  (error) => {
    const store = useGlobelStore();
    store.exception = error.message;
    return Promise.reject();
  }
);
axios.interceptors.response.use(
  (resp) => {
    // View Object
    const data: ResultVO = resp.data;
    // 状态码不为200返回错误
    if (data.code != 200) {
      console.log(data);
      const store = useGlobelStore();
      store.exception = data.message ?? '';
      return Promise.reject();
    }
    return resp;
  },
  (error) => {
    const store = useGlobelStore();
    store.exception = error.message;
    return Promise.reject();
  }
);

export default axios;
