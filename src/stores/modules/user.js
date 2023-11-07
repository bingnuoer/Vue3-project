import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义用户模块store
export const useUserStore = defineStore(
  'big-user',
  () => {
    //用户信息
    const token = ref('')
    //修改用户信息
    const setToken = (newToken) => {
      token.value = newToken
    }
    //重置用户信息
    const removeToken = () => {
      token.value = ''
    }

    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: true // 持久化
  }
)
