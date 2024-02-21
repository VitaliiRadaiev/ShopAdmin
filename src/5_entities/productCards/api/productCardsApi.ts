import { apiSlice } from "6_shared/api/apiSlice";
import { rquestWithJwtToken } from "6_shared/helpers/helpers";
import { IGetProductsBody, IGetProductsResponse, IProductCard, IUpdateProductBody } from "../types/types";
import { IDefaultResponse } from "6_shared/types/types";

export const productCardsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<IGetProductsResponse, IGetProductsBody>({
            query: (body) => ({ url: '/products/get', method: 'post', body }),
            transformResponse(response: IDefaultResponse<IGetProductsResponse>) {
                return response.data;
            },
            providesTags: ['Products']
        }),
        getProduct: builder.query<IProductCard, { id: string }>({
            query: ({ id }) => ({ url: '/products/product/' + id, method: 'get' }),
            transformResponse(response: IDefaultResponse<IProductCard>) {
                return response.data;
            },
            providesTags: ['Product']
        }),
        createProduct: builder.mutation<IProductCard, { categoryId: string }>({
            query: ({ categoryId }) => rquestWithJwtToken({
                url: "/products/create",
                method: 'post',
                body: {
                    categoryId
                }
            }),
            transformResponse(response: IDefaultResponse<IProductCard>, meta, arg) {
                return response.data;
            },
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation<any, { productId: string, body: IUpdateProductBody }>({
            query: ({ productId, body }) => rquestWithJwtToken({
                url: "/products/" + productId,
                method: 'put',
                body
            }),
            invalidatesTags: ['Product', 'Products']
        }),
        deleteProduct: builder.mutation<any, { productId: string }>({
            query: ({ productId }) => rquestWithJwtToken({
                url: "/products/" + productId,
                method: 'delete'
            }),
            invalidatesTags: ['Products', 'Product'] 
        }),
        createProductFeature: builder.mutation<any, { productId: string, body: { title: string, value: string } }>({
            query: ({ productId, body }) => rquestWithJwtToken({
                url: "/products/" + productId + "/feature",
                method: 'post',
                body
            }),
            invalidatesTags: ['Product']
        }),
        updateProductFeature: builder.mutation<any, { id: string, body: { title: string, value: string } }>({
            query: ({ id, body }) => rquestWithJwtToken({
                url: "/products/feature/" + id,
                method: 'put',
                body
            }),
            invalidatesTags: ['Product']
        }),
        deleteProductFeature: builder.mutation<any, { id: string }>({
            query: ({ id }) => rquestWithJwtToken({
                url: "/products/feature/" + id,
                method: 'delete',
            }),
            invalidatesTags: ['Product']
        }),
        uploadProductImages: builder.mutation<null, { productId: string, images: File[] }>({
            query: ({ productId, images }) => {
                const formData = new FormData();
                images.forEach(img => {
                    formData.append('images', img);
                })

                return rquestWithJwtToken({
                    url: "/products/" + productId + "/images",
                    method: 'post',
                    body: formData
                })
            },
            invalidatesTags: ['Product', 'Products']
        }),
        deletProductImage: builder.mutation<null, { id: string }>({
            query: ({ id }) => {
                return rquestWithJwtToken({
                    url: "/products/image/" + id,
                    method: 'delete'
                })
            },
            invalidatesTags: ['Product', 'Products']
        }),
        setProductImageAsMain: builder.mutation<null, { id: string }>({
            query: ({ id }) => {
                return rquestWithJwtToken({
                    url: "/products/image/" + id,
                    method: 'put'
                })
            },
            invalidatesTags: ['Product', 'Products']
        }),
        connectFilters: builder.mutation<null, { productId: string, filters: string[] }>({
            query: ({ productId, filters }) => rquestWithJwtToken({
                url: "/products/" + productId + "/filters",
                method: 'put',
                body: {
                    filters
                }
            }),
            invalidatesTags: ['Product']
        }),
        disconnectFilters: builder.mutation<null, { productId: string, filters: string[] }>({
            query: ({ productId, filters }) => rquestWithJwtToken({
                url: "/products/" + productId + "/filters",
                method: 'delete',
                body: {
                    filters
                }
            })
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useCreateProductFeatureMutation,
    useUpdateProductFeatureMutation,
    useDeleteProductFeatureMutation,
    useUploadProductImagesMutation,
    useDeletProductImageMutation,
    useSetProductImageAsMainMutation,
    useConnectFiltersMutation,
    useDisconnectFiltersMutation
} = productCardsApi;