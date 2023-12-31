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

const ignoreNonSerializableMiddleware = (store) => (next) => (action) => {
    if (action.type === 'persist/PERSIST') {
        return next(action);
    }
    return next(action);
};


export const Store = configureStore({
    reducer: persistedReducer,
    middleware: [ignoreNonSerializableMiddleware],
})

export const persistor = persistStore(Store)