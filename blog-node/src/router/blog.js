const { 
    getList,
    getDetail,
    addBlog,
    delBlog,
    getUpdate
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数
const loginCheck = req => {
    if (!req.session.username) {
        return new ErrorModel('0001', '尚未登录')
    }
}

const handleBlogRouter = (req, res) => {
    // 接收方法、路径、参数
    const { method, path, query, body } = req

    if (method === 'GET') {
        // 文章列表
        if (path === '/api/blog/list') {
            query['author'] = req.session.realname || ''
            return getResult(getList(query))
        }
        // 文章详情
        if (path === '/api/blog/detail') return getResult(getDetail(query))
    }
    if (method === 'POST') {
        // 新增文章
        if (path === '/api/blog/add') {
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult) return loginCheckResult
            body['author'] = req.session.realname
            return getResult(addBlog(body))
        }
        // 文章删除
        if (path === '/api/blog/del') {
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult) return loginCheckResult
            body['author'] = req.session.realname
            return getResult(delBlog(body))
        }
        // 文章修改
        if (path === '/api/blog/update') {
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult) return loginCheckResult
            return getResult(getUpdate(body))
        }
    }
}

// 处理查询返回结果
const getResult = result => {
    return result.then(res => {
        return new SuccessModel('0000', res)
    }).catch(err => {
        return new ErrorModel('0001', err)
    })
}

module.exports = handleBlogRouter