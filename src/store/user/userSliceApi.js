export const userApi = (builder) => ({
    getConnectedUser: builder.query({
        query: () => `/user`,
        providesTags: ['Users', 'Transactions']
    }),
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
    }),
    changeUserPassword: builder.mutation({
        query: (body) => ({
            url: `/user/change-password`,
            body,
            method: 'PATCH'
        }),
        invalidatesTags: ['Users']
    }),
    changeUserName: builder.mutation({
        query: (body) => ({
            url: `/user/change-name`,
            body,
            method: 'PATCH'
        }),
        invalidatesTags: ['Users']
    }),
})
