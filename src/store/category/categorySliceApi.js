export const categoryApi = (builder) => ({
    getAllCategories: builder.query({
        query: () => `/categories`,
        providesTags: ['Categories'],
        transformResponse: (response, meta, arg) => {
            const res = response.map(item => ({
                ...item,
                created_at: new Date(item.created_at).toLocaleDateString('pt-br')
            }))

            return res
        },
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
    deleteCategory: builder.mutation({
        query: (id) => ({
            url: `/category/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['Categories'],
    })
})
