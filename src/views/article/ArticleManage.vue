<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetArticleList } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'
const loading = ref(false)
const articleList = ref([]) //列表数据
const total = ref() //响应匹配数据总数

// 父组件数据-死数据
// const cateId = ref(70664)
// 活数据-所有参数
const params = ref({
  pagenum: 1, // 当前页码数
  pagesize: 5, //当前页的数据条数
  cate_id: '',
  state: ''
})

// 准备抽屉
const visibleDrawer = ref(false)

// 基于params参数，获取文章列表
const getArticleList = async () => {
  loading.value = true //获取文章列表前 开启loading效果

  const res = await artGetArticleList(params.value)
  articleList.value = res.data.data
  total.value = res.data.total

  loading.value = false //获取文章列表后 关闭loading效果
  console.log(res.data)
}
getArticleList()

// 分页
// 每页数据条数监听
const onSizeChange = (size) => {
  // console.log('当前每页条数', size)
  // 当前每页条数变了，重新渲染第1页
  params.value.pagenum = 1 //当前页
  params.value.pagesize = size //每页数据条数
  // 基于最新的当前页 和 每页数据条数，渲染数据
  getArticleList()
}
// 当前页监听
const onCurrentChange = (page) => {
  // console.log('当前页', page)
  params.value.pagenum = page
  getArticleList()
}

// 搜索、重置 监听
const onSearch = () => {
  // 基于当前下拉框选择数据，搜索 => 重置当前页为第1页，重新请求列表
  params.value.pagenum = 1
  getArticleList()
}

const onReset = () => {
  // 清空下拉框
  params.value.cate_id = ''
  params.value.state = ''
  // 重置当前页为第1页，重新请求列表
  params.value.pagenum = 1
  getArticleList()
}

// 添加逻辑
const onAddArticle = () => {
  visibleDrawer.value = true
}

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
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- 父组件数据与子组件做绑定:下拉框默认选中70187这个数据 -->
        <!-- v-model简写 v-model:modelValue="params.cate_id" -->
        <channel-select v-model="params.cate_id"></channel-select>
        <!-- <channel-select v-model:cid="params.cate_id"></channel-select> -->
      </el-form-item>

      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <!-- 给表格区域加loading效果 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <!-- 超链接 -->
        <!-- 插槽-自定义取数据，比prop方便 -->
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <!-- 在标签内部格式化时间 -->
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
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

    <!-- 分页区域 -->
    <!-- page-sizes必须包含自己设置的pagesize: 5每页多少条 -->
    <!-- flex布局居右 justify-content: end -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper,total, sizes, prev, pager, next "
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: end"
    />

    <!-- 抽屉区域 -->
    <el-drawer
      v-model="visibleDrawer"
      title="大标题"
      direction="rtl"
      size="50%"
    >
      <span>Hi, there!</span>
    </el-drawer>
  </page-container>
</template>

<style lang="scss" scoped></style>
