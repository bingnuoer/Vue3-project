import request from '@/utils/request'
// 分类：获取文章分类
export const artGetChannelsService = () => request.get('/my/cate/list')
// 分类：添加文章分类
export const artAddChannelsService = (data) =>
  request.post('/my/cate/add', data)
// 分类：编辑文章分类
export const artEditChannelsService = (data) =>
  request.put('/my/cate/info', data)
// 分类：然后在页面中注册、校验，然后注册事件

// 分类：删除文章分类-基于id删除
export const artDelChannelsService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章：获取文章列表
export const artGetArticleList = (params) =>
  request.get('/my/article/list', {
    params
  })

// 文章:发布文章
export const artPublishService = (data) => request.post('/my/article/add', data)

// 文章：编辑文章-回显
export const artGetDetailService = (id) =>
  request.get('/my/article/info', {
    params: {
      id
    }
  })

// 文章：编辑文章-提交
export const artEditService = (data) => request.put('/my/article/info', data)
