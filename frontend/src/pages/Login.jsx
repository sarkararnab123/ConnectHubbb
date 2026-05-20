import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setUserData } from '../redux/userSlice';
import axios from "axios"
import { serverUrl } from '../App';

const Signup = () => {

    const [ShowPassword , setShowPassword] = useState(false)
    const [ShowLoading , setShowLoading] = useState(false)

    const navigate = useNavigate();
    const [userName,setUserName] = useState("")
    const [password,setpassword] = useState("")

    const dispatch = useDispatch();


    const handleLogin = async(e)=>{
        setShowLoading(true)
        e.preventDefault()
        try {
            const result = await axios.post(`${serverUrl}/api/auth/login`,
                {userName,password},{withCredentials:true}
            )
            dispatch(setUserData(result.data))
            console.log(result.data)
            setShowLoading(false)
            setUserName("")
            setpassword("")
        } catch (error) {
            setShowLoading(false)
            console.log(error);
        }
    }



  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-green-900'>
        
        <div className='w-[90%] lg:max-w-5xl h-[600.1px] bg-white flex justify-center items-center border-2 overflow-hidden rounded-2xl shadow-lg'>
            
            <div className='w-full lg:w-1/2 h-full bg-white flex flex-col items-center justify-center gap-5 px-6'>
                
                <div>
                    <span className='text-3xl font-semibold text-gray-800'>
                        Login to ConnectHub
                    </span>
                </div>

                {/* Username */}
                <div className='flex flex-col justify-center w-[90%] h-18 rounded-2xl border-2 px-4'>
                    <label 
                        htmlFor='userName' 
                        className='text-gray-700 text-sm mb-1'
                    >
                        Enter your username
                       
                    </label>

                    <input 
                        type='text' 
                        id='userName' 
                        className='outline-none w-full text-base'
                         value = {userName}
                        onChange={(e)=>setUserName(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className='flex flex-col justify-center w-[90%] h-18 rounded-2xl border-2 px-4 relative'>
                    <label 
                        htmlFor='password' 
                        className='text-gray-700 text-sm mb-1'
                    >
                        Enter your password
                    </label>
                    <input 
                        type={ShowPassword?"text" : "password"}
                        id='password' 
                        className='outline-none w-full text-base'
                        value = {password}
                        onChange={(e)=>setpassword(e.target.value)}
                    />
                    <span className='absolute right-4 cursor-pointer'
                        onClick={()=> setShowPassword(prev => !prev)}
                    >show</span>
                </div>
                <h2 className='cursor-pointer w-[90%] px-4'
                    onClick={()=>navigate("/forgotpassword")}
                >Forgot password</h2>


                {/* login button */}
                <button className='w-[70%] px-[20.1px] bg-cyan-700 h-10 rounded-2xl cursor-pointer '
                   onClick={handleLogin}
                >Login</button>
                <p className='cursor-pointer text-gray-900'>Don't have an account <span className='text-violet-800 font-bold'
                    onClick={()=>navigate("/signup")}
                >Signup</span></p>

            </div>

            <div className='md:w-1/2 h-full hidden lg:flex justify-center items-center bg-amber-200 flex-col gap-3 text-base text-black'>
                  <h1>Connect HUB</h1>
                  <h2>Not Just a Platform.Make real connections</h2>
            </div>

        </div>

    </div>
  )
}

export default Signup