import User from "../Models/userModel.js";
import {uploadToCloudinary} from "../utils/cloudinary.js";
import {v2 as cloudinary} from 'cloudinary'
const signUpUser = async (req, res, next) => {
    try {
        const { username, email, password} = req.body;
        console.log("Received request to sign up user:", req.body);

        if (!username || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const user = await User.create({ username, email, password});
        const createdUser = await User.findById(user._id).select("-password");

        if (!createdUser) {
            throw new Error(500, "Something went wrong while registering the user");
        }

        const accessToken = user.generateAccessToken();
        const options = { httpOnly: true, secure: true };

        return res.status(201).cookie("accessToken", accessToken, options).json({
            userName: createdUser.username,
            email: createdUser.email,
            _id:createdUser._id,
            role:createdUser.role
        });
    } catch (error) {
        console.error(`Error in signUpUser: ${error.message}`);
        return res.status(500).json({ message: "Error in signing up user", error: error.message });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log("Received request to log in user with username:", username);

        if (!username || !password) {
            throw new Error(400, "All fields are required");
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const accessToken = user.generateAccessToken();
        const options = { httpOnly: true, secure: true };

        return res.status(200).cookie("accessToken", accessToken, options).json({
            userName: user.username,
            email: user.email,
            _id:user._id,
            role:user.role
        });
    } catch (error) {
        console.error(`Error in loginUser: ${error.message}`);
        return res.status(500).json({ message: "Error in logging in user", error: error.message });
    }
};
const updateUser=async(req,res)=>{
    try {
        const {username,password,age,email,phoneNumber}=req.body
        const userId=req.user._id
        if (!userId) {
            return res.status(400).json({ error: "User ID is missing" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if(username){
            user.username=username
        }
        if(age){
            user.age=age
        }
        if(email){
            user.email=email
        }
        if(phoneNumber){
            user.phoneNumber=phoneNumber
        }
        let accessToken
        if(password){
            user.password=password
            accessToken=await user.generateAccessToken()
        }
        await user.save()
        const options={
            httpOnly:true,
            secure:true
        }
        const responsePayload = {
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            age: user.age,
            role: user.role,
        };

        if (accessToken) {
            return res.status(200).cookie("accessToken", accessToken, options).json(responsePayload);
        } else {
            return res.status(200).json(responsePayload);
        }
    } catch (error) {
        console.log(`error in the update user ${error.message}`);
        return res.status(500).json({ message: "Error in updating user", error: error.message });
    }
}
const logoutUser = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: true
        };
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .json("User logged out");
    } catch (error) {
        console.log(`Error in logoutUser: ${error.message}`);
        return res.status(500).json({ message: "Error in logout user", error: error.message });
    }
};
const updateProfilePic =async(req,res)=>{
    try {
        console.log("i am at update user profile pic");
        
        const {profilePic}=req.body
        if(!profilePic){
            return res.status(401).json("ProfilePic Not Found")
        }
        const response=await uploadToCloudinary(profilePic)
        // console.log(response.secure_url);
        
        const user=await User.findById(req.user._id)
        if(user.profilePic){
            await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
        }
        user.profilePic=response.secure_url
        // console.log(user.profilePic);
        
        await user.save()
        return res.status(200).json({"profilePic updated successfully": user})
    } catch (error) {
        console.error(`Error in updating User: ${error.message}`);
        return res.status(500).json({ message: "Error in updating profilepic of user", error: error.message });
    }
}
const getUser=async(req,res)=>{
    try {
        const id=req.user._id
        const user=await User.findById(id).select('-password')
        if(!user){
            return res.status(404).json("no user found")
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log("error in get user ",error.message);
        return res.status(500).json({ message: "Error in get user", error: error.message });
    }
}
export { loginUser, signUpUser,updateUser,logoutUser,updateProfilePic,getUser };