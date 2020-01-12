const mysql = require('mysql')
const MYSQL_CONFIG = require('../config/db')

// 创建连接
const conn = mysql.createConnection(MYSQL_CONFIG)

// 开始连接
conn.connect()

// 统一执行sql
const exec = sql => {
    return new Promise((resolve, reject) => {
        // 查询
        conn.query(sql, (err, result) => {
            console.log(result);
            if (err) {
                reject(err)
            }
            resolve(result)
        });
    })
}

module.exports = exec
