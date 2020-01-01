const Koa = require('koa')

const app = new Koa()

const fs = require('fs')

app.use(async (ctx,next)=>{
    let startTime=new Date().getTime()
    // ctx.body="abc"
    console.log("第一个中间件")
    await next()
    console.log("第一个中间件结束")
    let endTime=new Date().getTime()
    let time=endTime-startTime

    fs.appendFileSync('./log.log',`${ctx.path}-${ctx.method}-${ctx.status}-${time}`)

    ctx.body=time
    // console.log(ctx.status)
})

app.use(async (ctx,next)=>{
    console.log("第二个中间件")
    await next()
    console.log("第二个中间件结束")

})

let delay=()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },1000)
    })
}

app.use(async (ctx,next)=>{
    console.log("第三个中间件")
    await delay()
})

app.listen(3000,()=>{
    console.log("服务器启动成功===")
})