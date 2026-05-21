import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setSuggestedUser, setUserData } from '../redux/userSlice';

const getSuggestedUser = () => {
    const dispatch = useDispatch();
    const {userData} = useSelector(state=>state.user)

    useEffect(()=>{
        const fetchUser = async()=>{
            try {
                const result = await axios.get(`${serverUrl}/api/user/suggestedusers`,{withCredentials:true})
                dispatch(setSuggestedUser(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[dispatch,userData])
}

export default getSuggestedUser;