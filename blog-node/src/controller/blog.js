// 获取文章列表
const getList = query => {
    // 获取请求参数
    const author = query.author || ''
    const keyword = query.keyword || ''
    // 先返回假数据
    return {
        code: '0000',
        data: [
            {
                id: 1,
                author: 'a',
                title: 'A',
                content: 'aaa',
                createTime: 1578752491648
            },
            {
                id: 2,
                author: 'b',
                title: 'B',
                content: 'bbb',
                createTime: 1578752518717
            }
        ]
    }
}

// 获取文章详情
const getDetail = query => {
    // 获取请求参数
    const id = query.id || ''
    // 先返回假数据
    return {
        code: '0000',
        data: [
            {
                id: 1,
                author: 'a',
                title: 'A',
                content: 'aaa',
                createTime: 1578752491648
            }
        ]
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