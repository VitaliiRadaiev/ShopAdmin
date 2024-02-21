import { FetchArgs } from '@reduxjs/toolkit/query/react';

export function rquestWithJwtToken(reqest: FetchArgs): FetchArgs {
    return {
        ...reqest,
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('X-JWTAdmin')
        }
    }
}