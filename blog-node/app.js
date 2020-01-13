const querystring = require('querystring')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

// 处理postData数据
const getPostData = req => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
            return resolve({})
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                return resolve({})
            }
            return resolve(JSON.parse(postData))
        })
    })
}

const serverHandle = async (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json;charset=utf-8')

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers['cookie'] || ''
    cookieStr.split(';').forEach(item => {
        if(!item) return
        const arr = item.split('=')
        req.cookie[arr[0]] = arr[1]
    });
    console.log('cookie', req.cookie)


    // 获取路径
    const url = req.url.split('?')
    // 解析路由参数
    req.path = url[0]
    req.query = querystring.parse(url[1]) || ''
    req.body = await getPostData(req)


    // 处理 user 路由
    const userData = handleUserRouter(req, res)
    if (userData) return userData.then(result => res.end(JSON.stringify(result)))

    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) return blogData.then(result => res.end(JSON.stringify(result)))

    // 未匹配路由, 返回 404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found')
    res.end()
}

module.exports = serverHandle