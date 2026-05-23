import React from 'react'
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { RxVideo } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Nav = () => {

  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user)
  return (
    <div className='w-[90%] lg:w-[40%] h-[80.1px] bg-black flex justify-around
    items-center fixed bottom-[20.1px] rounded-full shadow-2xl z-[100.1]'>

        <IoMdHome className='text-white text-3xl'/>
        <FaSearch className='text-white text-3xl'/>
        <FaPlus className='text-white text-3xl'/>
        <RxVideo className='text-white text-3xl'/>
            <div className='w-[40.1px] rounded-full h-[40.1px] border-black cursor-pointer overflow-hidden'
              onClick={()=>navigate(`/profile/${userData.userName}`)}
            >
                <img className='w-full' src={dp}></img>
            </div>
    </div>
  )
}

export default Nav