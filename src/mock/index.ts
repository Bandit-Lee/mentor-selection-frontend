import axios from '@/axios';
// import { listUser } from '@/datasources/datasource';
import type { ResultVO } from '@/datasources/Type';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
mock.onAny(/^http/).passThrough();
mock.onAny(/^\/api\//).passThrough();

const resulVO: ResultVO = {
  code: 200,
  data: {},
};

// const userList = listUser();

// mock.onPost('login').reply((c) => {
//   const data = c.data;
//   console.log('login请求接收到数据:', data);
//   const { uid, password } = JSON.parse(data);
//   const user = userList.find((u) => u.uid == uid);
//   if (user && user.password == password) {
//     resulVO.code = 200;
//     resulVO.message = '登陆成功';
//     resulVO.data.token = 'secret:' + user.uid;
//     resulVO.data.user = user;
//     return [200, resulVO];
//   }
//   resulVO.code = 401;
//   resulVO.message = '用户名/密码错误';
//   return [200, resulVO];
// });
