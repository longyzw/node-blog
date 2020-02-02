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
        return exec(sql).then(row => {
            return row[0]
        })
    }else {
        return ''
    }
}

// 添加文章
const addBlog = body => {
    // 获取请求参数
    const { title, desc, keyword, content, author } = body
    let sql = `
        insert into articles (title, \`desc\`, keyword, content, author) values 
        ('${title}', '${desc}', '${keyword}', '${content}', '${author}');
    `
    return exec(sql)
}

// 删除文章
const delBlog = body => {
    // 获取请求参数
    const { id, author } = body
    let sql = `delete from articles where id = ${id} and author = ${author};`
    return exec(sql)
}

// 修改文章
const getUpdate = body => {
    const { id, title, desc, keyword, content } = body
    let sql = ` update articles set title='${title}', \`desc\`='${desc}', keyword='${keyword}', content='${content}' where id='${id}'; `
    return exec(sql)
}

module.exports = {
    getList,
    getDetail,
    addBlog,
    delBlog,
    getUpdate
}