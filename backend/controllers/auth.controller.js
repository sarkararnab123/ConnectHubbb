import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { genToken } from "../config/token.js";
import { sendMail } from "../config/Mail.js";

export const Signup = async (req, res) => {

    try {
        const { name,userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "fill up all credentials" })
        }
        const findByemail = await User.findOne({ email })
        if (findByemail) {
            return res.status(400).json({ message: "Email already exits" })
        }
        const findByuserName = await User.findOne({userName})
        if (findByuserName) {
            return res.status(400).json({ message: "Username already exits" })
        }

        const hashedpassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            userName,
            email,
            password: hashedpassword
        })

        const token = await genToken(user._id)
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:10*356*24*60*60*1000,
            secure:false,
            sameSite:"Strict"
        })
    
        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({message:`signup error ${error}`})
    }
}

export const Login = async(req, res)=>{
    try {
        const {password,userName} = req.body;
        const user = await User.findOne({userName});
        if(!user){
            return res.status(400).json({message:'user not found'})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }
        const token = await genToken(user._id)
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:10*356*24*60*60*1000,
            secure:false,
            sameSite:"Strict"
        })
         return res.status(201).json(user);


    } catch (error) {
         return res.status(500).json({message:`login error ${error}`})
    }
}

export const signOut=async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"sign out sucessfully"})
    } catch (error) {
        return res.status(500).json({message:`signout error ${error}`})
    }
}

export const sendOtp = async (req , res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const otp = Math.floor(1000+Math.random()*9000).toString()
        user.resetOtp = otp,
        user.otpExpires = new Date.now() + 5*60*1000,
        user.isOtpVerified = false

        await user.save()
        await sendMail(email,otp)
        return res.status(200).json({message:"email sucessfullt send"})
    } catch (error) {
        return res.status(500).json({message:`send otp error ${error}`})
    }
}

export const verifyOtp = async(req , res)=>{
    try {
        const {email,otp} = req.body;
        const user = await User.findOne({email})
        if(!user || user.resetOtp != otp || user.otpExpires<Date.now()){
            return res.status(400).json({message:"invalid or expired otp"})
        }

        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        await user.save();
         return res.status(200).json({message:"otp verified sucessfully"})
    } catch (error) {
         return res.status(500).json({message:`otp verfication error ${error}`})
    }
}

export const resetPassword = async(req , res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({user})
        if(!user || !user.isOtpVerified){
            return res.status(400).json({message:"otp verification required"})
        }
        const hashedpassword = await bcrypt.hash(password,10);
        user.password = hashedpassword;
        user.isOtpVerified = false;
        user.save();
        return res.status(200).json({message:"password reset sucessfully"})
    } catch (error) {
         return res.status(500).json({message:`reset password error ${error}`})
    }
}