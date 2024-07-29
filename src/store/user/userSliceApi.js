import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../utils/apiBaseQuery';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/user/login',
                body,
                method: 'POST'
            })
        }),
        signUp: builder.mutation({
            query: (body) => ({
                url: '/user/signup',
                body,
                method: 'POST'
            }),
            invalidatesTags: ['Users']
        })
    })
})

export const {
    // useGetAllQuery,
    // useGetRoleQuery,
    useLoginMutation,
    useSignUpMutation,
    // useDeleteUserMutation,
    // useGetOneQuery,
    // useUpdateUserMutation
} = userApi