import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../utils/apiBaseQuery';

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery,
    tagTypes: ['Transactions'],
    endpoints: (builder) => ({
        getAll: builder.query({
            query: () => `/transactions`,
            providesTags: ['Transactions']
        }),
        // getOne: builder.query({
        //     query: ({ id }) =>
        //         `/category/${id}`,
        //     providesTags: ['Categories']
        // }),
        create: builder.mutation({
            query: (body) => ({
                url: '/transaction',
                body,
                method: 'POST'
            }),
            invalidatesTags: ['Transactions']
        }),
        // update: builder.mutation({
        //     query: ({ id, body }) => ({
        //         url: `/category/${id}`,
        //         body,
        //         method: 'PUT'
        //     }),
        //     invalidatesTags: ['Categories']
        // }),
    })
})

export const {
    useCreateMutation,
    // useUpdateMutation,
    // useGetOneQuery,
    useGetAllQuery
} = transactionApi