import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "6_shared/api/apiSlice";
import { authReducer } from "5_entities/auth";

export const rootReducer = combineReducers({
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});
