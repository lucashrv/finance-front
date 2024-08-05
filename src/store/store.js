import { configureStore } from '@reduxjs/toolkit'

// RTK Query Api
import { api } from '.';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            api.middleware,
        )
})

export default store
