var express = require('express');
var router = express.Router();
const { 
  getList,
  getDetail,
  addBlog,
  getUpdate,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('./../middleware/loginCheck')

// 博客列表
router.get('/list', (req, res, next) => {
  if(req.query.isadmin) {
    console.log('session:',req.session)
    // 管理员页面
    if(req.session.username == null) {
      res.json(new ErrorModel('0001', '请先登录'))
      return
    }
    // 强制查询自己的博客
    req.query.author = req.session.realname
  }
  return getList(req.query).then(result => {
    res.json(new SuccessModel('0000', result))
  })
});
// 博客详情
router.get('/detail', (req, res, next) => {
  return getDetail(req.query).then(result => {
    res.json(new SuccessModel('0000', result))
  })
});
// 博客添加
router.post('/add', loginCheck, (req, res, next) => {
  req.body.author = req.session.realname
  return addBlog(req.body).then(result => {
    res.json(new SuccessModel('0000', result))
  })
});
// 博客更新
router.post('/update', loginCheck, (req, res, next) => {
  req.body.author = req.session.realname
  req.body.id = req.query.id
  return getUpdate(req.body).then(result => {
    // console.log('update,',result)
    res.json(new SuccessModel('0000', result))
  })
});
// 博客删除
router.post('/del', loginCheck, (req, res, next) => {
  req.body.author = req.session.realname
  return delBlog(req.body).then(result => {
    res.json(new SuccessModel('0000', result))
  })
});

module.exports = router;
