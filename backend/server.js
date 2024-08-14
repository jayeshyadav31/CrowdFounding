import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import connectDb from './DBconnection/connectdb.js'
import userRoutes from "./routes/userRoutes.js"
dotenv.config()
const app=express()
const port=process.env.PORT || 5000
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/users',userRoutes)
connectDb()
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
    
})
