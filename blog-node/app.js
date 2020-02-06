const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const { access } = require('./src/utils/log')

// 设置cookie过期时间
const getCookieExpires = () => {
    let d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
    return d.toGMTString()
}

const getPostData = req => {
    const promise = new Promise((resolve, reject) => {
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
            return resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandle = async (req, res) => {

    // 记录 access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 设置返回格式
    res.setHeader('Content-type', 'application/json;charset=utf-8')

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers['cookie'] || ''
    cookieStr.split(';').forEach(item => {
        if (!item) return
        const arr = item.split('=')
        req.cookie[arr[0].trim()] = arr[1].trim()
    });
    console.log('cookie', req.cookie)

    // 获取路径
    const url = req.url.split('?')
    // 解析路由参数
    req.path = url[0]
    req.query = querystring.parse(url[1]) || ''
    req.body = await getPostData(req)

    // 解析 session （使用 redis）
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set(userId, {})
    }
    // 获取 session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }

        // 处理 user 路由
        const userData = handleUserRouter(req, res)
        if (userData) return userData.then(result => {
            if (needSetCookie) {
                res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            res.end(JSON.stringify(result))
        })
    
        // 处理 blog 路由
        const blogData = handleBlogRouter(req, res)
        if (blogData) return blogData.then(result => {
            if (needSetCookie) {
                res.setHeader('Set-cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            res.end(JSON.stringify(result))
        })
    
        // 未匹配路由, 返回 404
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found')
        res.end()
    })
}

module.exports = serverHandle