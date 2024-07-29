import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from '../../schemas/envSchema';

const baseQuery = fetchBaseQuery({
    baseUrl: env.VITE_API_URL,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');

        headers.set('Content-Type', 'application/json');

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }
})

export default baseQuery
