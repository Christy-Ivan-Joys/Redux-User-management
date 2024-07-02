import { apiSlice } from "./apiSlices";
const USERS_URL = 'api/users'




export const adminApiSlices = apiSlice.injectEndpoints({
    endpoints: (builder) =>( {
        Adminlogin: builder.mutation({
            query: (data) =>({
                url: `${USERS_URL}/admin`,
                method:'POST',
                body:data
            })
        }),
        GetUsers:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/UsersList`,
                method:'GET',
                   
        })
        }),
        Deleteuser:builder.mutation({
            query:(data)=>({
                 url:`${USERS_URL}/deleteUser`,
                 method:'POST',
                 body:data    
            })
       }),
       EditUser:builder.mutation({
        query:(data)=>({
            url:`${USERS_URL}/editUser`,
            method:'POST',
            body:data

        })
       }),
       
    })
})

export const {useAdminloginMutation,useGetUsersMutation,useDeleteuserMutation,useEditUserMutation} = adminApiSlices