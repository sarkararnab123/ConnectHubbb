import jwt from "jsonwebtoken";

export const genToken = async(userId)=>{

    try {
        const token =jwt.sign(
        {userId:userId},
        process.env.JWT_TOKEN,
        {expiresIn:"7d"}
    )
    return token;
    } catch (error) {
        console.log("Error",error)
    }

}