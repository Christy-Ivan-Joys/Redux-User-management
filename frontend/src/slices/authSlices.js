import {createSlice} from '@reduxjs/toolkit'


const initialState={
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
             state.userInfo=action.payload
             localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        logout:(state,action)=>{
        state.userInfo=null,
        localStorage.removeItem('userInfo')
        },
        Adminlogout: (state, action) => {
            state.userInfo
              ? ((state.userInfo = null), localStorage.removeItem("userInfo"))
              : (state.adminInfo = null),
              localStorage.removeItem("adminInfo")
          }
    }

})
export const {setCredentials,logout,Adminlogout}=authSlice.actions
export const authReducer= authSlice.reducer
