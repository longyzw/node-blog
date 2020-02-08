var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 用户登录
router.post('/login', function(req, res, next) {
    return login(req.body).then(data => {
        if (data && data.username) {
            console.log('login-s:',data,data.username)
            // 设置session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(new SuccessModel('0000', '登录成功'))
            return
        }
        res.json(new ErrorModel('1000', '登录失败'))
    })
});

module.exports = router;
