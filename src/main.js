import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 导入自己的样式
import '@/assets/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
