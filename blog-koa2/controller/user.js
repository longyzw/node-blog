const { exec, escape } = require('./../db/mysql')
const { genPassword } = require('./../utils/crypto')

// 用户登录
const login = async body => {
    // 获取请求参数
    let { username, password } = body
    // 生成加密密码
    password = genPassword(password)
    
    username = escape(username)
    password = escape(password)
    // 编写查询条件
    let sql = `select * from users where username=${username} and password=${password};`

    const rows = await exec(sql)
    console.log('login:',rows)
    return JSON.parse(JSON.stringify(rows))[0]
    // let res = JSON.parse(JSON.stringify(rows))
    // console.log('login:',res)
    // return res[0]
}

module.exports = {
    login
}