// 用户登录
const login = body => {
    // 获取请求参数
    const username = body.username || ''
    const password = body.password || ''
    // 先返回假数据
    return {
        code: '0000',
        data: {
            token: 'abcdefg',
            nickName: '龙影之舞'
        }
    }
}

module.exports = {
    login
}