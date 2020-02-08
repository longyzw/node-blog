const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
    if(req.session.username) {
        next()
        return
    }
    res.json(new ErrorModel('0001', '请先登录'))
}