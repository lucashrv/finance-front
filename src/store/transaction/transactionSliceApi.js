export const transactionApi = (builder) => ({
    getAllTransactions: builder.query({
        query: ({ startDate, endDate }) => {
            return `/transactions?startDate=${startDate}&endDate=${endDate}`
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
        invalidatesTags: ['Transactions']
    }),
    updateTransaction: builder.mutation({
        query: ({ id, body }) => ({
            url: `/transaction/${id}`,
            body,
            method: 'PUT'
        }),
        invalidatesTags: ['Transactions', 'Users']
    }),
})
