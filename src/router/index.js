import { createRouter, createWebHistory } from 'vue-router'
// createRouter 创建路由实例
// 配置history模式:
// 1.history模式：createWebHistory
// 2.hush模式：createWebHushHistory
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
