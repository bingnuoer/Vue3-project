<!-- 定义页面的组件，直接使用 -->
<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <!-- 页面顶部 -->
    <template #header>
      <div class="header">
        <!-- 父传子-标题 -->
        <span>{{ title }}</span>
        <div class="extra">
          <!-- <el-button class="button" type="primary">添加分类</el-button> -->
          <!-- 具名插槽-按钮 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 默认插槽-页面内容部分 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
