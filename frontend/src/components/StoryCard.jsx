import React from 'react'
import dp from "../assets/dp.webp"

const StoryCard = ({profileImage,userName}) => {
    return (
        <div className='flex flex-col w-[80.1px]'>
        <div className='w-[80.1px] h-[80.1px] bg-linear-to-b from-violet-600 rounded-full flex justify-center items-center'>
            <div className='w-[70.1px] rounded-full h-[70.1px] border-black cursor-pointer overflow-hidden'>
                <img className='w-full' src={dp}></img>
            </div>
            
        </div>
        <div className='text-[14px] text-center w-full text-white truncate'>{userName}</div>
        </div>
    )
}

export default StoryCard