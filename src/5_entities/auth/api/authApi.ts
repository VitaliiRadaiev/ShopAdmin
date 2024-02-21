import { apiSlice } from "6_shared/api/apiSlice";
import { rquestWithJwtToken } from "6_shared/helpers/helpers";
import { setAuth } from "../store/authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{ resultCode: number }, { name: string, password: string }>({
            query: (body) => ({ url: '/users/admin/login', method: 'POST', body }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data, meta } = await queryFulfilled;
                    if(data.resultCode === 0) {
                        const jwt = meta?.response?.headers.get('X-JWTAdmin');
                        jwt && localStorage.setItem('X-JWTAdmin', jwt);
                        dispatch(setAuth(true));
                    }

                } catch (error) {
                    //console.log(error);
                }
            },
        })
    })
});

export const {
    useLoginMutation,
} = authApi;