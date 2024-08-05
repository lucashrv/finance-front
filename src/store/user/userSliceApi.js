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
    updateUser: builder.mutation({
        query: ({ id, body }) => ({
            url: `/transaction/${id}`,
            body,
            method: 'PUT'
        }),
        invalidatesTags: ['Transactions', 'Users']
    }),
})
