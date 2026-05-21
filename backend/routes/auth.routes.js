import express from "express"
import { Login, resetPassword, sendOtp, signOut, Signup, verifyOtp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/signup',Signup)
authRouter.post('/login',Login)
authRouter.get('/signout',signOut)
authRouter.post('/sendotp',sendOtp)
authRouter.post('/verifyotp',verifyOtp)
authRouter.post('/resetpassword',resetPassword)


export default authRouter
