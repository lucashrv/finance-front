import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from '../utils/apiBaseQuery';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery,
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        getOne: builder.query({
            query: ({ id }) =>
                `/category/${id}`,
            providesTags: ['Categories']
        }),
        create: builder.mutation({
            query: (body) => ({
                url: '/category',
                body,
                method: 'POST'
            }),
            invalidatesTags: ['Categories']
        }),
        update: builder.mutation({
            query: ({ id, body }) => ({
                url: `/category/${id}`,
                body,
                method: 'PUT'
            }),
            invalidatesTags: ['Categories']
        }),
    })
})

export const {
    useCreateMutation,
    useUpdateMutation,
    useGetOneQuery
} = categoryApi