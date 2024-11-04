export const transactionApi = (builder) => ({
    getAllTransactions: builder.query({
        query: () => {
            return `/transactions`
        },
        providesTags: ['Transactions'],
    }),
    getFindCountAllTransactions: builder.query({
        query: ({ page, limit }) => {
            return `/transactions-paginate?page=${page}&limit=${limit}`
        },
        providesTags: ['Transactions'],
        transformResponse: (response, meta, arg) => {
            const options = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }

            const rows = response?.rows.map(item => ({
                ...item,
                created_at: new Date(item.created_at).toLocaleDateString('pt-br'),
                transaction: item.transaction.toLocaleString('pt-BR', options),
                category_name: item['category.name']
            }))

            return {
                ...response,
                rows,
            }
        },
    }),
    getAllTransactionsDate: builder.query({
        query: ({ startDate, endDate, page, limit }) => {
            return `/transactions-date?startDate=${startDate}&endDate=${endDate}&page=${page}&limit=${limit}`
        },
        providesTags: ['Transactions'],
    }),
    getOneTransaction: builder.query({
        query: ({ id }) =>
            `/transaction/${id}`,
        providesTags: ['Transactions']
    }),
    createTransaction: builder.mutation({
        query: (body) => ({
            url: '/transaction',
            body,
            method: 'POST'
        }),
        invalidatesTags: ['Transactions', 'Users']
    }),
    updateTransaction: builder.mutation({
        query: ({ id, body }) => ({
            url: `/transaction/${id}`,
            body,
            method: 'PUT'
        }),
        invalidatesTags: ['Transactions', 'Users']
    }),
    deleteTransaction: builder.mutation({
        query: (id) => ({
            url: `/transaction/${id}`,
            method: 'DELETE'
        }),
        invalidatesTags: ['Transactions', 'Users']
    }),
})
