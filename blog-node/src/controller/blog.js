const exec = require('../db/mysql')

// 获取文章列表
const getList = query => {
    // 获取请求参数
    const { author, keyword } = query
    // 编写查询条件
    let sql = `select * from articles where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(keyword) {
        sql += `and keyword='%${keyword}%' `
    }
    sql += `order by create_time desc;`
    return exec(sql)
}

// 获取文章详情
const getDetail = query => {
    const { id } = query
    if(id) {
        let sql = `select * from articles where id = ${id};`
        return exec(sql)
    }else {
        return ''
    }
}

// 添加文章
const addBlog = body => {
    // 获取请求参数
    const title = body.title || ''
    const content = body.content || ''
    // 先返回假数据
    return {
        code: '0000',
        data: '添加成功'
    }
}

// 删除文章
const delBlog = body => {
    // 获取请求参数
    const id = body.id || ''
    // 先返回假数据
    return {
        code: '0000',
        data: '删除成功'
    }
}

// 修改文章
const getUpdate = body => {
    // 获取请求参数
    const id = body.id || ''
    const title = body.title || ''
    const content = body.content || ''
    // 先返回假数据
    return {
        code: '0000',
        data: '更新成功'
    }
}

module.exports = {
    getList,
    getDetail,
    addBlog,
    delBlog,
    getUpdate
}