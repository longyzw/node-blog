const { getList } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    // 接收方法、路径、参数
    const { method, path, query } = req

    if (method === 'GET') {
        // 文章列表
        if (path === '/api/blog/list') {
            let { code, data }  = getList(query)
            return code === 0 ? new SuccessModel(code, data) : new ErrorModel(code, data)
        }
        // 文章详情
        if (path === '/api/blog/detail') {
            return {
                msg: '详情'
            }
        }
    }
    if (method === 'POST') {
        // 新增文章
        if (path === '/api/blog/add') {
            return {
                msg: '新增'
            }
        }
        // 文章删除
        if (path === '/api/blog/del') {
            return {
                msg: '删除'
            }
        }
        // 文章修改
        if (path === '/api/blog/update') {
            return {
                msg: '修改'
            }
        }
    }
}

module.exports = handleBlogRouter