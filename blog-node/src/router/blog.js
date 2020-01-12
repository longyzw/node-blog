const { 
    getList,
    getDetail,
    addBlog,
    delBlog,
    getUpdate
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    // 接收方法、路径、参数
    const { method, path, query, body } = req

    if (method === 'GET') {
        // 文章列表
        if (path === '/api/blog/list') return getResult(getList(query))
        // 文章详情
        if (path === '/api/blog/detail') return getResult(getDetail(query))
    }
    if (method === 'POST') {
        // 新增文章
        if (path === '/api/blog/add') return getResult(addBlog(body))
        // 文章删除
        if (path === '/api/blog/del') return getResult(delBlog(body))
        // 文章修改
        if (path === '/api/blog/update') return getResult(getUpdate(body))
    }
}

// 处理查询返回结果
const getResult = res => {
    let { code, data }  = res
    return code === 0 ? new SuccessModel(code, data) : new ErrorModel(code, data)
}

module.exports = handleBlogRouter