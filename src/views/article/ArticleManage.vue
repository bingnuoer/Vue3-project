<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
const articleList = ref([
  {
    id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  }
])

// 编辑逻辑
const onEditArticle = (row) => {
  console.log(row)
}

// 删除逻辑
const onDeleteArticle = (row) => {
  console.log(row)
}
</script>
<template>
  <!-- 直接使用组件，配置页面。不用导入 -->
  <page-container title="文章管理">
    <!-- 右侧按钮 -->
    <template #extra>
      <el-button>发布文章</el-button>
    </template>
    <!-- 表单部分 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <el-select>
          <!-- lable:展示给用户看，value:提交给后台的数据 -->
          <el-option label="新闻" value="110"></el-option>
          <el-option label="体育" value="137"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="发布状态：">
        <el-select>
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格部分 -->
    <el-table :data="articleList">
      <el-table-column label="文章标题" prop="title">
        <!-- 超链接 -->
        <!-- 插槽-自定义取数据，比prop方便 -->
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <!-- 作用域插槽onEditArticle(row)，row当做id传递给点击事件，操作本行数据 -->
          <el-button
            plain
            type="primary"
            circle
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            plain
            type="danger"
            circle
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </page-container>
</template>

<style lang="scss" scoped></style>
