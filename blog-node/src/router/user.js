const handleUserRouter = (req, res) => {
    // 接收方法、路径、参数
    const { method, path, query } = req

    if (method === 'POST') {
        // 用户登录
        if (path === '/api/user/login') {
            return {
                msg: '登录'
            }
        }
    }
}

module.exports = handleUserRouter