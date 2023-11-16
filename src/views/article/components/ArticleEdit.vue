<!-- 添加 和 编辑，可以共用一个抽屉，所以可以将抽屉封装成一个组件 -->
<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
// 局部注册富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artPublishService,
  artGetDetailService,
  artEditService
} from '@/api/article.js'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'

// 准备抽屉
const visibleDrawer = ref(false)

// 默认数据
const defaultForm = {
  title: '', //文章标题
  cate_id: '', // 文章分类id
  cover_img: '', // 文章封面 file类型
  content: '', // 文章内容
  state: '' // 文章状态
}
// 准备数据
const formModel = ref({
  ...defaultForm
})

// 组件对外暴露一个方法 open,  基于 open 的参数，初始化表单数据，并判断区分是添加 还是 编辑
// 1. open({ })                   =>  添加操作，添加表单初始化无数据
// 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显
const imgUrl = ref('')
// 富文本编辑器数据
const editorRef = ref('')
// 监听上传图片
const onUploadFile = (uploadFile) => {
  //   console.log(uploadFile)
  // 使用前端api获取图片URL
  imgUrl.value = URL.createObjectURL(uploadFile.raw) //预览图片
  formModel.value.cover_img = uploadFile.raw //提交图片
}

// 发布文章
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  // 将已发布、草稿状态存入formModel
  formModel.value.state = state

  // 注意：当前接口，需要的是 formData对象
  // 将普通对象 => 转换成 => formData对象
  const fd = new FormData()
  // formModel.value.value的值循环存到fd中
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  //   发请求
  if (formModel.value.id) {
    // 编辑操作
    console.log('编辑操作')
    await artEditService(fd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // 添加操作
    await artPublishService(fd)
    // 弹窗
    ElMessage.success('添加成功')
    // 关闭抽屉
    visibleDrawer.value = false
    // 通知父组件，添加成功了
    // 'add' 区分添加/编辑
    emit('success', 'add')
  }
}

// 调用open方法，打开抽屉
const open = async (row) => {
  visibleDrawer.value = true
  //   console.log(row)
  //   判断区分是添加 还是 编辑
  if (row.id) {
    console.log('编辑回显')
    // 基于row.id发送请求，获取编辑对应的详情数据，进行回显
    const res = await artGetDetailService(row.id)
    console.log(res)
    // 回显
    formModel.value = res.data.data
    // 图片需要单独回显，拼接基地址
    imgUrl.value = baseURL + formModel.value.cover_img

    // 需要将网络图片地址 => 转换成 file 对象，存储起来
    const file = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
    // 更新图片数据
    formModel.value.cover_img = file
  } else {
    // 基于默认的数据重置form数据
    formModel.value = { ...defaultForm }
    console.log('添加')
    // 这里重置了表单数据，但是图片上传img地址，富文本编辑器内容 => 需要手动重置
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

// 把open方法暴露出去
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 关闭自动上传，准备结构 -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <!-- v-model:content="formModel.content" 富文本框数据双向绑定 -->
          <!-- contentType="html" 文本是html页面文本形式 -->
          <!-- <QuillEditor theme="snow"></QuillEditor> -->
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
