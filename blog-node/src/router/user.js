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
const getResult = res => {
    let { code, data }  = res
    return code === 0 ? new SuccessModel(code, data) : new ErrorModel(code, data)
}

module.exports = handleUserRouter