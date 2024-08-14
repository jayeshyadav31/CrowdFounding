import User from "../Models/userModel.js";
import jwt from 'jsonwebtoken'
const verifyJwt=async(req,res,next)=>{
    try {
        const token=req.cookies.accessToken || req.header("authorization")?.replace("Bearer ","")
        //  console.log(token);
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findOne({_id:decodedToken._id}).select('-password')
        console.log(user);
        
        if (!user) {   
            return  new Error(401, "Invalid Access Token")
        }
        req.user = user;
        next()
    } catch (error) {
        console.log(`error in the verify jwt ${error.message}`);
        return  new Error(401, error?.message || "Invalid access token")
    }
}
export default verifyJwt