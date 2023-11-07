import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// 导入独立维护的pinia
import pinia from '@/stores/index'
// 导入自己的样式
import '@/assets/main.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
