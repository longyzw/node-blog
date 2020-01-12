const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
    // 接收方法、路径、参数
    const { method, path, query, body } = req

    if (method === 'POST') {
        // 用户登录
        if (path === '/api/user/login') return getResult(login(body))
    }
}

// 处理查询返回结果
const getResult = result => {
    return result.then(res => {
        return new SuccessModel('0000', res[0])
    }).catch(err => {
        return new ErrorModel('0001', err)
    })
}

module.exports = handleUserRouter