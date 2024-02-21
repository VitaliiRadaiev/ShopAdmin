import { apiSlice } from "6_shared/api/apiSlice";
import { rquestWithJwtToken } from "6_shared/helpers/helpers";

export const commentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteUsersComment: builder.mutation<null, { id: string }>({
            query: ({ id }) =>
                rquestWithJwtToken({
                    url: '/comments/' + id + '/admin',
                    method: 'delete'
                }),
            invalidatesTags: ['Product']
        }),
        createSubcomment: builder.mutation<null, { commentId: string, text: string }>({
            query: ({ commentId, text }) =>
                rquestWithJwtToken({
                    url: '/comments/' + commentId + '/subcomment',
                    method: 'post',
                    body: {
                        text
                    }
                }),
            invalidatesTags: ['Product']
        }),
        updateSubcomment: builder.mutation<null, { id: string, text: string }>({
            query: ({ id, text }) =>
                rquestWithJwtToken({
                    url: '/comments/subcomment/' + id,
                    method: 'put',
                    body: {
                        text
                    }
                }),
            invalidatesTags: ['Product']
        }),
        deleteSubcomment: builder.mutation<null, { id: string }>({
            query: ({ id }) =>
                rquestWithJwtToken({
                    url: '/comments/subcomment/' + id,
                    method: 'delete'
                }),
            invalidatesTags: ['Product']
        }),
    })
});

export const {
    useDeleteUsersCommentMutation,
    useCreateSubcommentMutation,
    useUpdateSubcommentMutation,
    useDeleteSubcommentMutation
} = commentsApi;