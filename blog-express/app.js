var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const path = require('path')
const fs = require('fs')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

var userRouter = require('./routes/user');
var blogRouter = require('./routes/blog');

var app = express();

let apath = ''
app.use(function (req, res, next) {
  console.log('--',req.headers.origin)
  apath = req.headers.origin
  // apath = 
  next();
});

app.use(cors({
  credentials: true,
  origin: apath || 'http://192.168.0.116:8081', // web前端服务器地址
}))

app.use('*', function (req, res, next) {
  if(req.method=="OPTIONS") {
    res.sendStatus(200);/*让options请求快速返回*/
  } else {
    next();
  }
});

// 日志环境区分
const ENV = process.env.NODE_ENV
if (ENV != 'production') {
  // 开发/测试环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'longyzw_1995#',
  resave: false,
  saveUninitialized: true,
  cookie: {
    // path: '/', // 默认值
    // httpOnly: true, // 默认值
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: sessionStore
}))

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
