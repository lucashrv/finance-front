import { configureStore } from '@reduxjs/toolkit'

// RTK Query Api
import { userApi } from './user/userSliceApi';
import { categoryApi } from './category/categorySliceApi';

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            categoryApi.middleware
        )
})

export default store
