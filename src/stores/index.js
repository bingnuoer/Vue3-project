// pinia独立维护
import { createPinia } from 'pinia'
// 持久化
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 统一导出仓库数据模块
export * from './modules/user'
export * from './modules/counter'
