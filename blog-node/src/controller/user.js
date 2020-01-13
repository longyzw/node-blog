const exec = require('../db/mysql')

// 用户登录
const login = body => {
    // 获取请求参数
    const { username, password } = body
    // 编写查询条件
    let sql = `select * from users where `
    if(username) {
        sql += `username='${username}' `
    }
    if(password) {
        sql += `and password='${password}'`
    }
    sql += `;`
    
    return exec(sql)
}

module.exports = {
    login
}