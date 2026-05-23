import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setProfileData } from '../redux/userSlice'
import { useEffect } from 'react'
import { serverUrl } from '../App';

const Profile = () => {
        const {userName} = useParams()
        const dispatch = useDispatch()
                const {profileData} = useSelector(state=>state.user)

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


  return (
    <div>
        {profileData?.name}
    </div>
  )
}

export default Profile