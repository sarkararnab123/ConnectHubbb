import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
export const serverUrl = "http://localhost:8000"

const App = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
    </Routes>
    
  )
}

export default App