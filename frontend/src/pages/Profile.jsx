import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setProfileData, setUserData } from '../redux/userSlice'
import { useEffect } from 'react'
import { serverUrl } from '../App';
import { IoArrowBackCircle } from "react-icons/io5";
import dp from "../assets/dp.webp"
import Nav from '../components/Nav'

const Profile = () => {
        const {userName} = useParams()
        const dispatch = useDispatch()
        const {profileData,userData} = useSelector(state=>state.user)
        const navigate = useNavigate();

    const handleProfile = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/user/getprofile/${userName}`,{withCredentials:true})
            dispatch(setProfileData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        handleProfile()
    },[userName , dispatch])

    const handleLogout =async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
            dispatch(setUserData(null));
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='w-full bg-black min-h-screen'>
    <div className='text-white w-full h-[80.1px] flex justify-between items-center px-[30.1px]'>
    <div
       onClick={()=>navigate('/')} 
    ><IoArrowBackCircle className='w-13 h-15'/></div>
    <div className='font-semibold text-xl'>{profileData?.userName}</div>
    <button className='text-white bg-red-600 rounded-xl px-[20.1px] w-[100.1px] py-[5.1px] h-[40.1px] cursor-pointer'
        onClick={handleLogout}
    >Logout</button>

    </div>

    <div className='w-full h-[150.1px] flex items-start gap-[20.1px] lg:gap-[50.1px] pt-13 px-7 justify-center'>
        <div className='w-[80.1px] rounded-full h-[80.1px] md:w-[140.1px] md:h-[140.1px] border-black cursor-pointer overflow-hidden'>
            <img className='w-full' src={profileData?.profileImage || dp}></img>
        </div>
        <div>
                <div className='font-semibold text-amber-100 text[22.1px] '>{profileData?.name}</div>
                <div className='font-semibold text-amber-100 text[17.1px] '>{profileData?.profession || "New User"}</div>
                <div className='font-semibold text-amber-100 text[17.1px] '>{profileData?.bio}</div>
        </div>
    </div>
    <div className='w-full h-[180.1px] flex items-center justify-center gap-[40.1px] md:gap-[60.1px] px-[20%] pt-[30.1px] text-amber-50'>
        <div>
            <div className='text-[20.1px] md:text-[30.1px] font-semibold'>{profileData?.posts.length}</div>
            <div className='text-[18.1px] text-amber-100'>Posts</div>
        </div>
        <div>
            <div className='text-[20.1px] md:text-[30.1px] font-semibold'>{profileData?.followers.length}</div>
            <div className='text-[18.1px] text-amber-100'>Followers</div>
        </div>
        <div>
            <div className='text-[20.1px] md:text-[30.1px] font-semibold'>{profileData?.following.length}</div>
            <div className='text-[18.1px] text-amber-100'>Following</div>
        </div>
    </div>

    <div className='w-full h-[80.1px] flex justify-center items-center gap-[20.1px]'>
         {profileData?._id == userData._id && 
            <button className='px-[10.1px] min-w-[150.1px] py-[5.1px] h-[40.1px] bg-white cursor-pointer rounded-2xl'
                onClick={()=>navigate("/editprofile")}
            >
            Edit Profile</button>
         }

         {profileData?._id != userData._id && 
            <>
            <button className='px-[10.1px] min-w-[150.1px] py-[5.1px] h-[40.1px] bg-white cursor-pointer rounded-2xl'>Follow</button>
             <button className='px-[10.1px] min-w-[150.1px] py-[5.1px] h-[40.1px] bg-white cursor-pointer rounded-2xl'>Message</button>
            </>
            }
    </div>
    <div className='w-full min-h-[100.1vh] flex justify-center'>
    <div className='w-full max-w-[900.1px] flex flex-col items-center rounded-t-[30.1px] bg-white relative gap-[20.1px] pt-[30.1px]'>
            <Nav/>
    </div>

    </div>

        
    </div>
  )
}

export default Profile