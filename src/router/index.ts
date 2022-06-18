import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/home.vue'),
      },
      {
        path: '/student/choose',
        component: () => import('@/views/student/StudentChoose.vue'),
      },
      {
        path: '/student/chosen',
        component: () => import('@/views/student/StudentChosen.vue'),
      },
      {
        path: '/teacher',
        component: () => import('@/views/teacher/TeacherMain.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
  },
];

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //验证浏览器本地存储是否有token（或从vuex、Cookie、localStorage中获取，依据自己的存储），用于判断是否登录
    if (!sessionStorage.token) {
      //没有token，表示未登录，则重定向到login
      next({
        //这里是你登录页面的路由名称，或直接使用 path:'/login'
        name: 'Login',
        //query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    // 确保一定要调用 next()
    next();
  }
});

export default router;
