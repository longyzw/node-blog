const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 设置cookie过期时间
const getCookieExpires = () => {
    let d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    // 接收方法、路径、参数
    const { method, path, query, body, cookie } = req

    if (method === 'GET') {
        // 用户登录
        if (path === '/api/user/login') {
            return login(query).then(data => {
                if(data && data.username) {
                    res.setHeader('Set-cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                    return getResult(Promise.resolve('登录成功'))
                }
                res.setHeader('Set-cookie',`username=''`)
                return getResult(Promise.reject('尚未登录'))
            })
        }
    }

    if (method === 'GET') {
        // 用户登录
        if (path === '/api/user/login-test') return getResult(cookie.username ? Promise.resolve('登录成功') : Promise.reject('尚未登录'))
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

module.exports = handleUserRouter