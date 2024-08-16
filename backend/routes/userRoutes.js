import { Router } from "express";
import { getUser, loginUser, logoutUser, signUpUser, updateProfilePic, updateUser } from "../controller/userController.js";
import verifyJwt from "../middleware/authMiddleware.js";
const router=Router();
router.post('/login',loginUser)
router.post('/signup',signUpUser)
router.get('/get',verifyJwt,getUser)
router.post('/logout',verifyJwt,logoutUser)
router.patch('/update',verifyJwt,updateUser)
router.post('/update/profilePic',verifyJwt,updateProfilePic)
export default router