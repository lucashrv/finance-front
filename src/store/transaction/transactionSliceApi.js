export const transactionApi = (builder) => ({
    getAllTransactions: builder.query({
        query: () => {
            return `/transactions`
        },
        providesTags: ['Transactions'],
    }),
    getAllTransactionsDate: builder.query({
        query: ({ startDate, endDate }) => {
            return `/transactions-date?startDate=${startDate}&endDate=${endDate}`
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
