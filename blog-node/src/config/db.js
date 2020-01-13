const env = process.env.NODE_ENV // 环境变量

// 配置
let MYSQL_CONFIG

if (env === 'dev') {
    MYSQL_CONFIG = {
        host: '47.106.144.123',
        user: 'blog-node',
        password: 'lyzw',
        port: '3344',
        database: 'blog-node'
    }
}

if (env === 'production') {
    MYSQL_CONFIG = {
        host: '47.106.144.123',
        user: 'blog-node',
        password: 'lyzw',
        port: '3344',
        database: 'blog-node'
    }
}

module.exports = MYSQL_CONFIG