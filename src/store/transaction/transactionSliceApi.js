export const transactionApi = (builder) => ({
    getAllTransactions: builder.query({
        query: ({ page, limit }) => {
            return `/transactions?page=${page}&limit=${limit}`
        },
        providesTags: ['Transactions'],
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
