import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSlice {
    isAuth: boolean;
}

const initialState: AuthSlice = {
    isAuth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        }
    }
})

export const {
    setAuth
} = authSlice.actions;

export const authReducer = authSlice.reducer;