import { configureStore } from '@reduxjs/toolkit'

// RTK Query Api
import { userApi } from './user/userSliceApi';

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        // [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
            // productsApi.middleware
        )
})

export default store
