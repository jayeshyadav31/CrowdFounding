import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import connectDb from './DBconnection/connectdb.js'
import userRoutes from "./routes/userRoutes.js"
import campaignRoutes from "./routes/campaignRoutes.js"
import donationRoutes from './routes/donationRoutes.js'
import { confirmation, stripePayment } from './controller/stripeController.js'
dotenv.config()
const app=express()
const port=process.env.PORT || 5000
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/users',userRoutes)
app.use('/api/campaign',campaignRoutes)
app.use('/api/donation',donationRoutes)
app.use('/api/stripe/checkout',stripePayment)
app.use('/api/stripe/confirmation',confirmation)

connectDb()
app.listen(port,()=>{
    console.log(`server is listening to port ${port}`);
    
})
