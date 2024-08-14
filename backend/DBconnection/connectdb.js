import mongoose from "mongoose";
const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL,{
            serverSelectionTimeoutMS:10000
        })
        console.log(`database connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log('error in connecting to database',error.message);
        
    }
}
export default connectDb;