const mysql=require('mysql')
module.exports=()=>{
    let connection = mysql.createConnection({
        host:'localhost',
        part:3306,
        user:'root',
        password:'root',
        database:'1707f'
    })

    connection.connect((error)=>{
        if(error){
            console.log("数据库连接失败")
        }else{
            console.log("数据库连接成功")
        }
    })

    return new Promise((resolve,reject)=>{
        connection.query('select * from userlist',(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
            connection.end()
        })
    })
}