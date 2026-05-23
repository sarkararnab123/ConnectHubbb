import express from "express"
import { isAuth } from "../middlewares/isAuth.js";
import { editProfile, getCurrentUser, getProfile, suggestedUsers } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.get("/suggestedusers",isAuth,suggestedUsers)
userRouter.post("/editprofile",isAuth,upload.single("profileImage"),editProfile)
userRouter.get("/getprofile/:userName",isAuth,getProfile)


export default userRouter;