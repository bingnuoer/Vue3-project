import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
// import * as router from 'vue-router'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  //   ----------一般不会出错，只要baseURL对----------
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    // ----------一般不会出错！ 要是出错：看请求头的有没有Authorization => useUserStore仓库数据是否出错----------
    const userStore = useUserStore()
    if (userStore.token) {
      // 携带参数给请求头
      config.headers.Authorization = userStore.token
    }

    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据
    // 请求成功的业务逻辑
    if (res.data.code === 0) {
      return res
    }
    // TODO 3. 处理业务失败,给错误提示，抛出错误
    // 利用element-plus组件提示效果
    //   ----------只要有弹框就不会出错----------
    ElMessage.error(res.data.mess)
    return Promise.reject(res.data.message || '服务器异常')
  },
  (err) => {
    // TODO 5. 处理401错误
    // 错误的特殊情况 => 401 权限不足 或 token过期 => 拦截到登录
    // status状态码
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 错误的默认情况 => 只要给提示
    ElMessage.error(err.response.data.message || '服务器异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
