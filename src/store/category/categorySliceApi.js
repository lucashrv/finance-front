export const categoryApi = (builder) => ({
    getAllCategories: builder.query({
        query: () => `/categories`,
        providesTags: ['Categories']
    }),
    getOneCategory: builder.query({
        query: ({ id }) =>
            `/category/${id}`,
        providesTags: ['Categories']
    }),
    createCategory: builder.mutation({
        query: (body) => ({
            url: '/category',
            body,
            method: 'POST'
        }),
        invalidatesTags: ['Categories']
    }),
    updateCategory: builder.mutation({
        query: ({ id, body }) => ({
            url: `/category/${id}`,
            body,
            method: 'PUT'
        }),
        invalidatesTags: ['Categories']
    }),
})
