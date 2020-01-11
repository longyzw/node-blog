const querystring = require('querystring')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')

    // 获取路径
    const url = req.url.split('?')
    // 解析路由参数
    req.path = url[0]
    req.query = url[1] || ''

    // 处理 user 路由
    const userData = handleUserRouter(req, res)
    if (userData) {
        return res.end(JSON.stringify(userData))
    }

    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
        return res.end(JSON.stringify(blogData))
    }

    // 未匹配路由, 返回 404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found')
    res.end()
}

module.exports = serverHandle