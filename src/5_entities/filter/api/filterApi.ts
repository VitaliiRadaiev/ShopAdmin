import { apiSlice } from "6_shared/api/apiSlice";
import { rquestWithJwtToken } from "6_shared/helpers/helpers";

export const filterApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateFilterBlock: builder.mutation<any, { id: string, title: string }>({
            query: ({ id, title }) => rquestWithJwtToken({ url: '/filters/'+id, method: 'put', body: { title } }),
            invalidatesTags: ['Category']
        }),
        deleteFilterBlock: builder.mutation<any, { id: string }>({
            query: ({ id }) => rquestWithJwtToken({ url: '/filters/'+id, method: 'delete' }),
            invalidatesTags: ['Category']
        }),
        createFilterBlock: builder.mutation<any, { categoryId: string, title: string }>({
            query: (body) => rquestWithJwtToken({ url: '/filters', method: 'post', body }),
            invalidatesTags: ['Category']
        }),
        updateFilterItem: builder.mutation<any, { id: string, title: string }>({
            query: ({ id, title }) => rquestWithJwtToken({ url: '/filters/item/'+id, method: 'put', body: { title } }),
            invalidatesTags: ['Category']
        }),
        deleteFilterItem: builder.mutation<any, { id: string }>({
            query: ({ id }) => rquestWithJwtToken({ url: '/filters/item/'+id, method: 'delete' }),
            invalidatesTags: ['Category']
        }),
        createFilterItem: builder.mutation<any, { filterBlockId: string, title: string }>({
            query: ({ filterBlockId, title }) => rquestWithJwtToken({ url: '/filters/'+filterBlockId+'/item', method: 'post', body: { title } }),
            invalidatesTags: ['Category']
        }),
    })
});

export const {
    useUpdateFilterBlockMutation,
    useDeleteFilterBlockMutation,
    useCreateFilterBlockMutation,
    useUpdateFilterItemMutation,
    useDeleteFilterItemMutation,
    useCreateFilterItemMutation
} = filterApi;