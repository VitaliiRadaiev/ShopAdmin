import { apiSlice } from "6_shared/api/apiSlice";
import { IDefaultResponse } from "6_shared/types/types";
import { rquestWithJwtToken } from "6_shared/helpers/helpers";
import { IGetOrdersBody, IGetOrdersResponse, IOrder, OrderStatuses } from "../types/types";


export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<IGetOrdersResponse, IGetOrdersBody>({
            query: (body) => rquestWithJwtToken({ url: '/history/orders', method: 'post', body }),
            transformResponse: (response: IDefaultResponse<IGetOrdersResponse>) => {
                return response.data
            },
            providesTags: ['Orders']
        }),
        getOrder: builder.query<IOrder, { id: number }>({
            query: ({ id }) => rquestWithJwtToken({ url: '/history/order/'+id, method: 'get' }),
            transformResponse: (response: IDefaultResponse<IOrder>) => {
                return response.data
            },
            providesTags: ['Order']
        }),
        updateOrder: builder.mutation<null, { id: number, status: OrderStatuses }>({
            query: ({ id, status }) => rquestWithJwtToken({
                url: '/history/order/' + id,
                method: 'put',
                body: {
                    status
                }
            }),
            invalidatesTags: ['Orders', 'Order']
        }),
        deleteOrder: builder.mutation<null, { id: number }>({
            query: ({ id }) => rquestWithJwtToken({
                url: '/history/order/' + id,
                method: 'delete'
            }),
            invalidatesTags: ['Orders', 'Order']
        }),
    })
});

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = ordersApi;