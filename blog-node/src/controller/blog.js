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

module.exports = {
    getList
}