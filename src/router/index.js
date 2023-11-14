import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
// createRouter 创建路由实例
// 配置history模式:
// 1.history模式：createWebHistory
// 2.hush模式：createWebHushHistory
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, //登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      // 重定向
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截 -> 默认是直接放行的
// 根据返回值决定，放行/拦截
router.beforeEach((to) => {
  // 没有token，且访问的是非登录页，拦截到登录，其他情况正常放行
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
  // return true //放行
})

export default router
