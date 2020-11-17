export default [
  {
    path: '/user',
    component: '../layouts/login',
    routes: [
      {
        title: '登录',
        path: '/user/login',
        component: './user/login'
      },
      {
        title: '注册',
        path: '/user/register',
        component: './user/register'
      }
    ]
  },
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        title: '首页',
        path: '/',
        component: '../pages/index',
      },
      {
        path: '/test',
        component: '../pages/test',
      },
      {
        title: '角色管理',
        path: '/system/role/index',
        component: './system/role',
      },
    ],
  },

]