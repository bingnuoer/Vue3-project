import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'

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

    // 获取用户基本信息-发送请求
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      user.value = res.data.data
    }
    // 重置本地用户基本信息
    const setUser = () => {
      user.value = {}
    }
    return {
      token,
      setToken,
      removeToken,

      // 用户信息
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true // 持久化
  }
)
