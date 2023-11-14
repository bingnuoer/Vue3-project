<script setup>
// 页面中调用接口
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { artGetChannelsService, artDelChannelsService } from '@/api/article.js'
// 导入封装的弹层组件
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage } from 'element-plus'

const channelList = ref([])
const loading = ref(false) // 加载loading效果
const dialog = ref() //组件数据

const getChannelList = async () => {
  loading.value = true //发送请求前开启 loading效果
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false //请求结束关闭 loading效果
  console.log(channelList.value)
}
getChannelList()

// 删除分类
const onDelChannel = async (row) => {
  // console.log(row)
  // 提示框
  await ElMessageBox.confirm('你确认要删除该分类么？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelsService(row.id)
  ElMessage.success('删除成功')
  // 重新渲染表单
  getChannelList()
}

// 点击按钮 调用open方法 显示弹窗
const onEditChannel = (row) => {
  dialog.value.open(row)
}

// 添加分类
const onAddChannel = () => {
  // dialogVisible.value = true
  dialog.value.open({})
}

// 父级修改数据
const onSuccess = () => {
  // 重新渲染数据
  getChannelList()
}
</script>

<template>
  <!-- 直接使用组件，配置页面。不用导入 -->
  <page-container title="文章分类">
    <!-- 右侧按钮 -->
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>
    <!-- 主体部分，是表格 -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column prop="" label="操作" width="100">
        <!-- scope={row,$index};row是每一行，$index是索引 -->
        <template #default="{ row, $index }">
          <el-button
            plain
            type="primary"
            :icon="Edit"
            circle
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            plain
            type="danger"
            :icon="Delete"
            circle
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <!-- 表格没数据时，做空处理效果 -#empty插槽 -->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 弹层组件-通过 ref 绑定 -->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
