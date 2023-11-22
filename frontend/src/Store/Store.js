import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

export const Store = configureStore({
    reducer: {
        user: AuthSlice,
    }
})