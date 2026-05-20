import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();

export const transporter = nodemailer.createTransport({

  service: "Gamil",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async(to,otp)=>{
    await transporter.sendMail({
        from:`${process.env.EMAIL}`,
        to:to,
        subject:"REset your password",
        html:`<p>Your otp for password reset is <b>${otp}</b>
        It expires in 5 min</p>`
    })
}