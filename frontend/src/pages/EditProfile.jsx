import React, { useRef, useState } from 'react'
import { IoArrowBackCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dp from "../assets/dp.webp"
import axios from 'axios'
import { setProfileData, setUserData } from '../redux/userSlice';
import { serverUrl } from '../App';

const EditProfile = () => {

    const navigate = useNavigate();
    const { userData } = useSelector(state => state.user)
    const imageInput = useRef()
    const [frontendImage , setfrontendImage] = useState(userData.profileImage || dp)
    const [backendImage , setbackendImage] = useState(null)

    const [name,setName] = useState(userData.name || "")
    const [userName,setuserName] = useState(userData.userName || "")
    const [bio,setBio] = useState(userData.bio|| "")
    const [profession,setProfession] = useState(userData.profession || "")
    const [gender,setgender] = useState(userData.gender || "")
    const dispatch = useDispatch();


    const handleImage = (e)=>{
        const file = e.target.files[0]
        if (!file) return
        setbackendImage(file)
        setfrontendImage(URL.createObjectURL(file))
    }

    const handleEditProfile = async()=>{
        try {
            const formdata = new FormData();
            formdata.append("name",name);
            formdata.append("userName",userName);
            formdata.append("bio",bio);
            formdata.append("profession",profession);
            formdata.append("gender",gender);
            if(backendImage){
                formdata.append("profileImage",backendImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/editprofile`,formdata,{withCredentials:true})
            dispatch(setProfileData(result.data))
            dispatch(setUserData(result.data))
            navigate(`/profile/${result.data.userName}`)

        } catch (error) {
            console.log(error)
            
        }
    }


    return (
        <div className='w-full min-h-[100.1vh] bg-black flex items-center flex-col
        gap-[20.1px] p-[20.1px]'>
            <div className='absolute left-[20.1px]'>
                <IoArrowBackCircle className='w-13 h-15 text-amber-50 cursor-pointer'
                    onClick={() => navigate(`/profile/${userData.userName}`)}
                />
            </div>
            <h2 className='text-white text-[20.1px] font-semibold'>Edit Profile</h2>

            <div className='w-[90.1px] rounded-full h-[90.1px] md:w-[140.1px] md:h-[140.1px] border-black cursor-pointer overflow-hidden mt-10'
                    onClick={()=>imageInput.current.click()}
            >
                <input type='file' accept='image/*' ref={imageInput} hidden
                    onChange={handleImage}
                />
                <img className='w-full ' src={frontendImage}></img>
            </div>
            <div className='text-blue-500 text-center text-[18.1px] font-semibold'>Change Your Profile Picture</div>

            {/* form */}


            <input type='text' className='w-[90%] max-w-[600.1px] h-[60.1px] bg-[#180303e4] border-2 border-gray-700 rounded-2xl text-amber-50 px-1'
                placeholder='Enter your Name'
                onChange={(e)=>setName(e.target.value)}
                value={name}
            />
            <input type='text' className='w-[90%] max-w-[600.1px] h-[60.1px] bg-[#180303e4] border-2 border-gray-700 rounded-2xl text-amber-50 px-1'
                placeholder='Enter your username'
                onChange={(e)=>setuserName(e.target.value)}
                value={userName}
            />
            <input type='text' className='w-[90%] max-w-[600.1px] h-[60.1px] bg-[#180303e4] border-2 border-gray-700 rounded-2xl text-amber-50 px-1'
                placeholder='Enter your bio'
                onChange={(e)=>setBio(e.target.value)}
                value={bio}
            />
            <input type='text' className='w-[90%] max-w-[600.1px] h-[60.1px] bg-[#180303e4] border-2 border-gray-700 rounded-2xl text-amber-50 px-1'
                placeholder='Enter your profession'
                onChange={(e)=>setProfession(e.target.value)}
                value={profession}
            />
            <input type='text' className='w-[90%] max-w-[600.1px] h-[60.1px] bg-[#180303e4] border-2 border-gray-700 rounded-2xl text-amber-50 px-1'
                placeholder='Enter your gender'
                onChange={(e)=>setgender(e.target.value)}
                value={gender}
            />

            <button className='px-[10.1px] w-[60%] max-w-[400.1px] py-[5.1px] h-[50.1px] bg-amber-50 rounded-2xl font-semibold'
                onClick={handleEditProfile}
            >Save Profile</button>
        </div>
    )
}

export default EditProfile