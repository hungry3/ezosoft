import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ErrorMiddleware from './src/middleware/error.middleware.js'

import authRouter from './src/routers/auth.router.js'
import adminRouter from './src/routers/admin.router.js'
import  userRouter from './src/routers/User.router.js'
import blogRouter from './src/routers/blog.router.js'
const app = express()

app.use(cors({
    origin: ['http://localhost:5173', process.env.CLIENT],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())
app.use("/api/blog/",blogRouter)
app.use("/api/auth/",authRouter)
app.use('/api/admin/',adminRouter)
app.use('/api/user/',userRouter)




app.get("/test",(req,res,next)=>{
    res.status(200).json({
        success:true,
        message:"Api is working"
    })
})


app.all("*",(req,res,next)=>{
    const err = new Error(`Route ${req.originalUrl} not found`)
    err.statusCode = 404;
next(err)
})

app.use(ErrorMiddleware)

export {app}