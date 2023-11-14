<script setup>
import { ref } from 'vue'
import { artEditChannelsService, artAddChannelsService } from '@/api/article.js'
// import { ElMessage } from 'element-plus' 这块不要再导入ElMessage，会导致消息提示失效

const dialogVisible = ref(false) //点击按钮添加弹层效果
const formRef = ref()
// 准备弹层表单数据
const formModel = ref({
  cate_name: '', //分类名称
  cate_alias: '' //分类别名
})
// 配规则
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-0]{1,15}$/,
      message: '分类别名必须是1-15位的字母或数字',
      trigger: 'blur'
    }
  ]
}

// 判断方法参数是否有值
// 有-添加
// 无-编辑-回显
const open = (row) => {
  console.log(row)
  dialogVisible.value = true //打开弹窗
  formModel.value = { ...row } // 添加 -> 重置了表单内容，编辑 -> 存储了需要回显的数据
}

//   子传父
const emit = defineEmits(['success'])
// 点击提交数据
const onsubmit = async () => {
  // 校验数据
  await formRef.value.validate()

  const isEdit = formModel.value.id //有id 编辑，没id 添加
  //   判断、发送请求
  if (isEdit) {
    await artEditChannelsService(formModel.value)
    ElMessage.success('编辑成功') //消息提示 -按需引入ElMessage，没有消息提示
  } else {
    await artAddChannelsService(formModel.value)
    ElMessage.success('添加成功')
  }

  //   formModel.value.id
  //     ? await artEditChannelsService(formModel.value)
  //     : await artAddChannelsService(formModel.value)
  //   ElMessage({
  //     type: 'success',
  //     message: formModel.value.id ? '编辑成功' : '添加成功',
  //     duration: 2000 // 设置持续时间为 2 秒
  //   })

  //   关闭弹层
  dialogVisible.value = false
  //   通知父级修改数据-回显
  emit('success')
}

// 向外暴露方法
defineExpose({
  open
})
</script>

<template>
  <!-- 对话框弹层 -->
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
  >
    <!-- <span>我是内容部分</span> -->
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="请输入分类名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="请输入分类别名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onsubmit"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
