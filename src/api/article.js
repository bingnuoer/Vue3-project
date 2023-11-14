import request from '@/utils/request'
// 获取文章分类
export const artGetChannelsService = () => request.get('/my/cate/list')
// 添加文章分类
export const artAddChannelsService = (data) =>
  request.post('/my/cate/add', data)
// 编辑文章分类
export const artEditChannelsService = (data) =>
  request.put('/my/cate/info', data)
// 然后在页面中注册、校验，然后注册事件

// 删除文章分类-基于id删除
export const artDelChannelsService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })
