import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Signup = () => {

    const [ShowPassword , setShowPassword] = useState(false)
    const [ShowLoading , setShowLoading] = useState(false)

    const navigate = useNavigate();
    const [name,setName] = useState("")
    const [password,setpassword] = useState("")
    const [email,setemail] = useState("")
    const [userName,setUserName] = useState("")


    const dispatch = useDispatch();



    const handleSignup = async(e)=>{
        setShowLoading(true)
        e.preventDefault()
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`,
                {name,userName,email,password},{withCredentials:true}
            )
            dispatch(setUserData(result.data))
            console.log(result.data)
            setShowLoading(false)
            setName("")
            setUserName("")
            setemail("")
            setpassword("")
        } catch (error) {
            setShowLoading(false)
            console.log(error);
        }
    }


  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-blue-900'>
        
        <div className='w-[90%] lg:max-w-5xl h-[600.1px] bg-white flex justify-center items-center border-2 overflow-hidden rounded-2xl shadow-lg'>
            
            <div className='w-full lg:w-1/2 h-full bg-white flex flex-col items-center justify-center gap-5 px-6'>
                
                <div>
                    <span className='text-3xl font-semibold text-gray-800'>
                        Sign up to ConnectHub
                    </span>
                </div>

                {/* Name */}
                <div className='flex flex-col justify-center w-[90%] h-18 rounded-2xl border-2 px-4'>
                    <label 
                        htmlFor='name' 
                        className='text-gray-700 text-sm mb-1'
                    >
                        Enter your name
                    </label>

                    <input 
                        type='text' 
                        id='name' 
                        className='outline-none w-full text-base'
                        value = {name}
                        onChange={(e)=>setName(e.target.value)}
                    />
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

                {/* Email */}
                <div className='flex flex-col justify-center w-[90%] h-18 rounded-2xl border-2 px-4'>
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
                    >{ShowPassword ? "Hide" : "Show"}</span>
                </div>

                {/*signup button */}
                <button className='w-[70%] px-[20.1px] bg-amber-600 h-10 rounded-2xl cursor-pointer '
                    onClick={handleSignup}
                >{ShowLoading?"Loading":"Signup"}</button>
                <p className='cursor-pointer text-gray-900'>Already have an account <span className='text-red-500 font-bold'
                    onClick={()=>navigate("/login")}
                >Login</span></p>

            </div>

            <div className='md:w-1/2 h-full hidden lg:flex justify-center items-center bg-amber-200 flex-col gap-3 text-base'>
                    <h1>Connect HUB</h1>
                  <h2>Not Just a Platform.Make real connections</h2>
            </div>

        </div>

    </div>
  )
}

export default Signup