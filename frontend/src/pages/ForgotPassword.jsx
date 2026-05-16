import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../App';

const ForgotPassword = () => {
    const [step, setStep] = useState(1)
    const [email,setemail] = useState("")
    const [otp,setOtp] = useState("")
    const [newPassword,setnewPassword] = useState("")
    const [confirmPassword,setconfirmPassword] = useState("")


    const handleStep1 = async ()=>{
        try {
            const result = await axios.post(`${serverUrl}/api/auth/sendotp`,
                {email} , {withCredentials:true})
                console.log(result.data)
                setStep(2)
        } catch (error) {
            console.log(error)
        }
    }

    const handleStep2 = async ()=>{
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verifyotp`,
                {email,otp} , {withCredentials:true})
                console.log(result.data)
                setStep(3)
        } catch (error) {
            console.log(error)
        }
    }

    const handleStep3 = async ()=>{
        try {
            if(newPassword !== confirmPassword){
                return console.log("password does not match")
            }
            const result = await axios.post(`${serverUrl}/api/auth/resetpassword`,
                {email,newPassword} , {withCredentials:true})
                console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='w-full h-screen flex flex-col justify-center items-center bg-green-900'>

            {step == 1 && <div className='h-[500.1px] bg-sky-500 rounded-2xl flex justify-center items-center flex-col border-0 w-[90%] max-w-[500.1px] gap-7'>
                <h2 className='font-semibold text-xl'>Forgot Password</h2>
                <div className='flex flex-col justify-center w-[90%] h-18 rounded-2xl border-2 px-4 bg-amber-100'>
                    <label 
                        htmlFor='email' 
                        className='text-gray-700 text-sm mb-1'
                    >
                        Enter your email
                    </label>

                    <input 
                        type='email' 
                        id='email' 
                        className='outline-none w-full text-base'
                        value = {email}
                        onChange={(e)=>setemail(e.target.value)}
                    />
                </div>
                <button className='w-[70%] px-[20.1px] bg-amber-600 h-10 rounded-2xl cursor-pointer '
                    onClick={handleStep1}
                >Send OTP</button>
        </div>}


        {/*step 2 */}
        {step == 2 && <div className='h-[500.1px] bg-sky-500 rounded-2xl flex justify-center items-center flex-col border-0 w-[90%] max-w-[500.1px] gap-7'>
            <h2 className='font-semibold text-xl'>Forgot Password</h2>
                <div className='flex flex-col justify-center w-[90%] h-18 rounded-2xl border-2 px-4 bg-amber-100'>
                    <label 
                        htmlFor='otp' 
                        className='text-gray-700 text-sm mb-1'
                    >
                        Enter your otp
                    </label>

                    <input 
                        type='text' 
                        id='otp' 
                        className='outline-none w-full text-base'
                        value = {otp}
                        onChange={(e)=>setOtp(e.target.value)}
                    />
                </div>
                <button className='w-[70%] px-[20.1px] bg-amber-600 h-10 rounded-2xl cursor-pointer '
                    onClick={handleStep2}
                >Verify OTP</button>
        </div>}

        {/*step 3*/}
        {step == 3 && (
  <div className='h-[500.1px] bg-sky-500 rounded-2xl flex justify-center items-center flex-col border-0 w-[90%] max-w-[500.1px] gap-7'>
    
    <h2 className='font-semibold text-xl'>Reset Password</h2>

    <div className='flex flex-col w-[90%] rounded-2xl border-2 px-4 py-5 bg-amber-100 gap-4'>

      {/* New Password */}
      <div className='flex flex-col gap-1'>
        <label
          htmlFor='newPassword'
          className='text-gray-700 text-sm'
        >
          Enter new password
        </label>

        <input
          type='password'
          id='newPassword'
          className='outline-none w-full text-base px-2 py-2 rounded-lg border bg-white'
          value={newPassword}
          onChange={(e) => setnewPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div className='flex flex-col gap-1'>
        <label
          htmlFor='confirmPassword'
          className='text-gray-700 text-sm'
        >
          Enter confirmed password
        </label>

        <input
          type='password'
          id='confirmPassword'
          className='outline-none w-full text-base px-2 py-2 rounded-lg border bg-white'
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
      </div>

    </div>

    <button
      className='w-[70%] px-[20.1px] bg-amber-600 h-10 rounded-2xl cursor-pointer text-white font-semibold'
            onClick={handleStep3}
    >
      Update Password
    </button>

  </div>
)}

    </div>
    )
}

export default ForgotPassword