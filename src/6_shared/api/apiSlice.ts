import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
window.currentHost = 'localhost:8001';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${window.currentHost}/api`,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }),
    tagTypes: ['Categories', 'Category', 'Products', 'Product', 'Orders', 'Order'],
    endpoints: builder => ({})
}) 
