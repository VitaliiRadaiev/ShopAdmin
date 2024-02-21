import { apiSlice } from "6_shared/api/apiSlice";
import { rquestWithJwtToken } from "6_shared/helpers/helpers";
import {  ICategory } from "../types/types";
import { IDefaultResponse } from "6_shared/types/types";

export const categoriesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({ url: '/categories' }),
            transformResponse(baseQueryReturnValue: IDefaultResponse<ICategory[]>, meta, arg) {
                return baseQueryReturnValue.data;
            },
            providesTags: ['Categories']
        }),
        getCategory: builder.query({
            query: (id: string) => {
                return ({ url: '/categories/'+id })
            },
            transformResponse(baseQueryReturnValue: IDefaultResponse<ICategory>, meta, arg) {
                return baseQueryReturnValue.data;
            },
            providesTags: ['Category']
        }),
        updateCategory: builder.mutation<any, { id: string, title: string }>({
            query: ({ id, title }) => rquestWithJwtToken({ url: '/categories/'+id, method: 'put', body: { title } }),
            invalidatesTags: ['Categories']
        }),
        deleteCategory: builder.mutation<any, { id: string }>({
            query: ({ id }) => rquestWithJwtToken({ url: '/categories/'+id, method: 'delete', }),
            invalidatesTags: ['Categories']
        }),
        createCategory: builder.mutation<any, { title: string }>({
            query: ({ title }) => rquestWithJwtToken({ url: '/categories', method: 'post', body: { title } }),
            invalidatesTags: ['Categories']
        }),
    })
});

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useCreateCategoryMutation
} = categoriesApi;