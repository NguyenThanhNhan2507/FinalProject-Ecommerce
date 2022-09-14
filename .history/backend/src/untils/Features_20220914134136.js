class Feture {
    constructor(query, queryStr){
        this.query = query
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        }
        :{
        }
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this
    }

    filters(){
        const copyQuery = {...this.queryStr}
        const deleteField = ["keyword","page","limit"]
        deleteField.forEach((key)=> delete copyQuery[key])

        this.query = this.query.find(copyQuery)
        return this
    }

    phanLoai(pageResult){
        const trangHienTai = Number(this.queryStr.page) || 1
        const skip = pageResult *(trangHienTai -1)
        this.query = this.query.limit(pageResult).skip(skip)
        return this
    }
}
module.exports = Feture