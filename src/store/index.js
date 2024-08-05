import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './utils/apiBaseQuery';

// Api
import { categoryApi } from './category/categorySliceApi';
import { transactionApi } from './transaction/transactionSliceApi';
import { userApi } from './user/userSliceApi';

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: [
        'Users',
        'Categories',
        'Transactions',
    ],
    endpoints: (builder) => ({
        ...userApi(builder),
        ...categoryApi(builder),
        ...transactionApi(builder),
    })
})
