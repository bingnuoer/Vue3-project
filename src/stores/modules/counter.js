import { defineStore } from 'pinia'
import { ref } from 'vue'

// 数字计数器模块store
export const useCounterStore = defineStore('big-counter', () => {
  // 数据
  const count = ref(100)
  //加法方法
  const addCount = (n) => {
    count.value += n
  }

  return {
    count,
    addCount
  }
})
