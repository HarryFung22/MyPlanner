import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import AuthSlice from "./AuthSlice";

const persistConfig = {
    key: 'root', 
    storage, 
    whitelist: ['user'], 
};

const persistedReducer = persistReducer(persistConfig, AuthSlice);

export const Store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(Store)