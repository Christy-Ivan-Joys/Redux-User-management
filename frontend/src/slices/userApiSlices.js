import { apiSlice } from "./apiSlices";

const USERS_URL = 'api/users'


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        upload: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/upload`,
                method: 'POST',
                body: data
            })
        }),
        data: builder.mutation({

            query: (data) => ({
                url: `${USERS_URL}/userData`,
                method: 'POST',
                body: data

            })
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/updateProfile`,
                method: 'POST',
                body: data

            })
        }),
        UpdateImage: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/updateImage`,
                method:'POST',
                body:data
            })
        })

    })
})


export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useUploadMutation, useDataMutation, useUpdateMutation,useUpdateImageMutation} = usersApiSlice