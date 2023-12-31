import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: null,
    authToken: null,
    refreshToken: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { username, authToken, refreshToken } = action.payload;
            return {
                ...state,
                username,
                authToken,
                refreshToken,
            };
        },
        logout: () => initialState, 
    },
});


export const {login, logout} = userSlice.actions

export default userSlice.reducer