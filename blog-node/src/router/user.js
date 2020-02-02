const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    // 接收方法、路径、参数
    const { method, path, body } = req

    if (method === 'POST') {
        // 用户登录
        if (path === '/api/user/login') {
            return login(body).then(data => {
                if (data && data.username) {
                    // 设置session
                    req.session.username = data.username
                    req.session.realname = data.realname
                    // 同步到 redis
                    set(req.sessionId, req.session)
                    return getResult(Promise.resolve('登录成功'))
                }
                return getResult(Promise.reject('尚未登录'))
            })
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

module.exports = handleUserRouter