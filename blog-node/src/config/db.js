const env = process.env.NODE_ENV // 环境变量

// 配置
let MYSQL_CONFIG

if (env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'lyzw',
        port: '3306',
        database: 'blog-node'
    }
}

if (env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: 'lyzw',
        port: '3306',
        database: 'blog-node'
    }
}

module.exports = MYSQL_CONFIG