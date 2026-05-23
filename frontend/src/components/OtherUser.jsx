import React from 'react'
import { useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { useNavigate } from 'react-router-dom'

const OtherUser = ({user}) => {
    const {userData} = useSelector(state=>state.user)
    const navigate = useNavigate()
    return (
        <div className='w-full h-[79.1px] flex items-center justify-between border-b-2 border-gray-800 '>
            <div className='flex items-center gap-[10.1px]'>
                <div className='w-[50.1px] rounded-full h-[50.1px] border-black cursor-pointer overflow-hidden'>
                    <img className='w-full' src={user.profileImage || dp}></img>
                </div>
                <div 
                    onClick={()=>navigate(`/profile/${user.userName}`)}
                >
                    <div className='text-[18px] text-gray-400 font-semibold'>{user.userName}</div>
                    <div className='text-[15px] text-white font-semibold'>{user.name}</div>

                </div>
            </div>
            <button className='px-[10.1px] w-[100.1px] py-[5.1px] h-[40.1px] bg-white rounded-2xl text-black font-sans font-semibold'>Follow</button>
        </div>
    )
}

export default OtherUser