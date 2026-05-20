import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload   //Store whatever data comes in payload into userData.
        }
    }
})

export const {setUserData} = userSlice.actions
export default userSlice.reducer