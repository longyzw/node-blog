const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')

const blog = require('./routes/blog')
const user = require('./routes/user')

const { REDIS_CONFIG } = require('./config/db')

// error handler
onerror(app)

// 处理跨域
// app.use(cors())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
  // ctx.set('Access-Control-Allow-Headers', "Content-Type");
  ctx.set('Content-Type', "*");
  ctx.set('Access-Control-Allow-Credentials', true);
  await next();
 });
  
 //防止每次请求都返回Access-Control-Allow-Methods以及Access-Control-Max-Age，
 //这两个响应头其实是没有必要每次都返回的，只是第一次有预检的时候返回就可以了。
 app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
   ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
   ctx.set('Access-Control-Max-Age', 3600 * 24);
   ctx.body = '';
  }
  await next();
 });


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 日志环境区分
const ENV = process.env.NODE_ENV
if (ENV != 'production') {
  // 开发/测试环境
  app.use(morgan('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

// 处理session和Redis
app.keys = ['longyzw_1995#']
console.log(REDIS_CONFIG)
app.use(session({
  key: 'lyzw.sid', // cookie name 默认是 koa.sid
  prefix: 'lyzw:sess:', // redis key 的前缀，默认是 koa:sess:
  // 配置 cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  // ttl:24*60*60*1000,
  // 配置 Redis
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}))

// routes
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
