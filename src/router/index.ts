import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/menu/menu.vue'),
      children: [
        {
          path: '/overview',
          name: 'overview',
          component: () => import('../views/overview/overview.vue'),
        },
        {
          name: 'product_message',
          path: '/product_message',
          component: () => import('@/views/user_message/product_message/index.vue'),
        },
        {
          name: 'users_message',
          path: '/users_message',
          component: () => import('@/views/user_message/users_message/index.vue'),
        },
        {
          name: 'message_message',
          path: '/message_message',
          component: () => import('@/views/user_message/message_message/index.vue'),
        },
        {
          name: 'user_list',
          path: '/user_list',
          component: () => import('@/views/user_message/user_list/index.vue'),
        },
        {
          name: 'outbound_list',
          path: '/outbound_list',
          component: () => import('@/views/product_message/outbound_list/index.vue'),
        },
        {
          name: 'product_list',
          path: '/product_list',
          component: () => import('@/views/product_message/product_list/index.vue'),
        },
        {
          name: 'message_list',
          path: '/message_list',
          component: () => import('@/views/message_management/message_list/index.vue'),
        },
        {
          name: 'recycle_bin',
          path: '/recycle_bin',
          component: () => import('@/views/message_management/recycle_bin/index.vue'),
        },
        // {
        //   name: 'login_log',
        //   path: '/login_log',
        //   component: () => import('@/views/login_log/index.vue'),
        // },
        {
          name: 'operation_log',
          path: '/operation_log',
          component: () => import('@/views/operation_log/index.vue'),
        },
        // {
        //   name: 'set', //这个是路由的名字
        //   path: '/set', //这个是路由的路径
        //   component: () => import('@/views/set/index.vue'), //这个是当前路由要打开的文件
        // },
      ],
    },
  ],
})
router.beforeEach((to) => {
  const token = localStorage.getItem('userinfo')
  if (to.path.startsWith('/overvoew') && !token) {
    return '/login'
  }
})
export default router
