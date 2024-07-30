import { configureStore } from '@reduxjs/toolkit'

// RTK Query Api
import { userApi } from './user/userSliceApi';
import { categoryApi } from './category/categorySliceApi';
import { transactionApi } from './transaction/transactionSliceApi';

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            categoryApi.middleware,
            transactionApi.middleware,
        )
})

export default store
