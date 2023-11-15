<script setup>
import { artGetChannelsService } from '@/api/article.js'
import { ref } from 'vue'
// 子组件接收数据
defineProps({
  modelValue: {
    type: [Number, String]
  }
})
// 子组件提交数据
const emit = defineEmits(['update:modelValue'])

// 请求的列表数据-存到数据里
const channelList = ref([])
// 请求获取列表数据
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  console.log(channelList.value)
}
getChannelList()
</script>

<template>
  <!-- 子与父的双向绑定 -->
  <!-- 子组件给父组件传递数据 -->
  <!-- :modelValue 子接收父组件传的数据
  @update:modelValue 子传递给父的数据 ,$event:当前下拉框的数据 -->

  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <!-- lable:展示给用户看，value:提交给后台的数据 -->
    <el-option
      v-for="item in channelList"
      :key="item"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
