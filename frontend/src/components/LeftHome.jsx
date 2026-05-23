import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import OtherUser from './OtherUser';

const LeftHome = () => {

    const {userData, suggestedUsers} = useSelector(state=>state.user)
    const dispatch = useDispatch();

    const handleLogout =async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
            dispatch(setUserData(null));
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-[25%] hidden lg:block min-h-[100.1vh]
    bg-black border-r-2 border-gray-900'>
    <div className='w-full h-[100.1px] flex items-center justify-between p-[20.1px]'>
        <div>
            <h2 className='text-violet-700 text-3xl font-bold'>ConnectHub</h2>
        </div>
        <div>
            <IoIosNotifications className='text-white text-2xl ' />
        </div>
    </div>

        {/* 2nd part */}

        <div className='flex items-center gap-[10.1px] w-full justify-between border-b-2 border-b-gray-900 p-2'>
         <div className='flex items-center gap-[10.1px]'>
        <div className='w-[70.1px] rounded-full h-[70.1px] border-black cursor-pointer overflow-hidden'>
            <img className='w-full' src={userData.profileImage || dp}></img>
        </div>
        <div >
        <div className='text-[18px] text-gray-400 font-semibold'>{userData.userName}</div>
            <div className='text-[15px] text-white font-semibold'>{userData.name}</div>
            
        </div>
        </div>
        <button className='px-[20.1px] w-[100.1px] py-[5.1px] h-[40.1px] bg-red-600 rounded-xl text-amber-50'
            onClick={handleLogout}
        >LogOut</button>
        </div>


        <div className='w-full flex flex-col gap-[20.1px] p-[20.1px] '>
            <h1 className='text-white text-[15px] '>Suggested Users</h1>

            <div>
                {suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>(
                    <OtherUser key={index} user={user}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default LeftHome