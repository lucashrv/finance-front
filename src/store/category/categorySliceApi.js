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
    getFindCountAllCategories: builder.query({
        query: ({ page, limit, search, order, orderType }) => {
            return `/categories-paginate?page=${page}&limit=${limit}&search=${search}&order=${order}&orderType=${orderType}`
        },
        providesTags: ['Categories'],
        transformResponse: (response, meta, arg) => {

            const rows = response?.rows.map(item => ({
                ...item,
                created_at: new Date(item.created_at).toLocaleDateString('pt-br')
            }))

            return {
                ...response,
                rows
            }
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
