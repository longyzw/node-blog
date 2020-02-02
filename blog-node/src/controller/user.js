const exec = require('../db/mysql')

// 用户登录
const login = body => {
    // 获取请求参数
    const { username, password } = body
    // 编写查询条件
    let sql = `select * from users where 1=1 `
    if(username) {
        sql += `and username='${username}' `
    }
    if(password) {
        sql += `and password='${password}'`
    }
    sql += `;`
    
    return exec(sql).then(row => row[0])
}

module.exports = {
    login
}