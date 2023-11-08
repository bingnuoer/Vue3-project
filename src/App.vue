<script setup>
import { useRouter, useRoute } from 'vue-router'
// 渲染仓库数据
// import { useUserStore } from '@/stores/modules/user'
// import { useCounterStore } from '@/stores/modules/counter'
// 统一导入仓库数据
import { useUserStore, useCounterStore } from '@/stores'

// router路由对象，route路由参数
const router = useRouter()
const route = useRoute()
// console.log(import.meta.env.DEV)
const getList = () => {
  router.push('/list')
  console.log(router, route)
}

// 仓库数据
const userStore = useUserStore()
const counterStore = useCounterStore()
</script>

<template>
  <div>
    <hr />
    <!-- 查看配置的路由 -->
    <router-view></router-view>
    <hr />
    <hr />

    我是App
    <testDemo></testDemo>
  </div>
  <button @click="$router.push('/home')">跳转首页</button>
  <button @click="getList">跳转列表</button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>

  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('newValue asdfghjkl')">登录</el-button>
  <el-button @click="userStore.removeToken()">退出</el-button>

  <hr />
  {{ counterStore.count }}
  <el-button @click="counterStore.addCount(2)">加2</el-button>
</template>

<style scoped></style>
