const express=require('express')
const ratelimit=require('express-rate-limit')
const  mongoSanitize=require('express-mongo-sanitize')
const hpp=require('hpp')
const helmet=require('helmet')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const path=require('path')

const {DATA_LIMIT,URL_ENCODE,RATE_LIMIT,MAX_LIMIT,WEB_CACHE}=require('./config')

const Routes=require('./src/routes/route')
const app=express()

 app.use(cors())
 app.use(helmet())
 app.use(hpp())
 app.use(cookieParser())

app.use(express.json())
 app.use(express.urlencoded({extended:URL_ENCODE}))

 const limiter=ratelimit({
    windowMs:RATE_LIMIT,
     max:MAX_LIMIT
 })

 app.use(limiter)

//app.set('etag',WEB_CACHE)
app.use('/api/v1',Routes)

// app.get('/ok',(req,res)=>{
// res.json('hello')
// })


module.exports=app;