import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../ApiSlice";
import  authSlice from '../Auth/authSlice'
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] :apiSlice.reducer,
        auth:authSlice,
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(apiSlice.middleware),
    
})