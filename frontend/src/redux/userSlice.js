import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        suggestedUsers:null
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData = action.payload   //Store whatever data comes in payload into userData.
        },
        setSuggestedUser:(state,action)=>{
            state.suggestedUsers = action.payload
        }
    }
})

export const {setUserData,setSuggestedUser} = userSlice.actions
export default userSlice.reducer