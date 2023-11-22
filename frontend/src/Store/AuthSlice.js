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
            state.username = action.payload.username
            state.authToken = action.payload.authToken
            state.refreshToken = action.payload.refreshToken
        },
        logout: (state) => {
            state.username = null
            state.authToken = null
            state.refreshToken = null
        }
    }
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer