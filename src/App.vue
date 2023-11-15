<script setup>
// import { useRoute,useRouter } from 'vue-router';
// import {useUserStore,useCountStore} from '@/stores'
// const route = useRoute()
// const router = useRouter()
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <!-- 路由出口 -->
  <!-- 全局国际化处理 -->
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
