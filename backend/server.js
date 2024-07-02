import express from 'express'
const app=express()
import { fileURLToPath } from 'url'
import {join,dirname} from 'path'
import userRoutes from './routes/userRoutes.js' 
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
connectDB()


import dotenv from 'dotenv'
dotenv.config()    
const port=process.env.PORT
const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(join(__dirname,'assets')))
app.use('/api/users',userRoutes)
app.use(notFound)
app.use(errorHandler)
app.get('/',(req,res)=>res.send('server is ready'))
app.listen(port,()=>{
    console.log(`connected to the server on port${port}`)
})  