import {configureStore} from '@reduxjs/toolkit'
import {authReducer} from './slices/authSlices'
import { apiSlice } from './slices/apiSlices'
import { adminReducer } from './slices/adminSlice'
import { adminApiSlices } from './slices/adminApiSlices'

const store=configureStore({
    reducer:{
        [adminApiSlices.reducerPath]:adminApiSlices.reducer,
        
        auth:authReducer,
        admin:adminReducer

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true
    
})
export default store