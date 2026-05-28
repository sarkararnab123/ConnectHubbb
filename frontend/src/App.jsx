import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
export const serverUrl = "http://localhost:8000"
import { Navigate } from 'react-router-dom'
import getSuggestedUser from './hooks/getSuggestedUsers'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'


const App = () => {
  getCurrentUser()
  getSuggestedUser()
  const {userData} = useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/signup' element={!userData?<Signup/>:<Navigate to={"/"}/>}></Route>
      <Route path='/login' element={!userData?<Login/>:<Navigate to = {'/'}/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
      <Route path='/' element={userData?<Home/>:<Navigate to={"/signup"}/>}></Route>
      <Route path='/profile/:userName' element={userData?<Profile/>:<Navigate to={"/signup"}/>}></Route>
      <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to={"/signup"}/>}></Route>
    </Routes>
    
  )
}

export default App