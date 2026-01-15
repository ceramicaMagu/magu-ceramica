import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState from './initialState'
import extraReducersAuth from './extraReducers'
import { User, SiteConfig } from '@/types/auth'

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        refreshStateAuth: () => initialState,
        refreshStatusAuth: (state) => {
            state.status = {}
        },
        setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        updateSiteConfig: (state, action: PayloadAction<SiteConfig>) => {
            state.siteConfig = action.payload;
        },
    },
    extraReducers(builder) {
        extraReducersAuth(builder)
    },
})

export const {
    refreshStateAuth,
    refreshStatusAuth,
    setUser,
    logout,
    updateSiteConfig
} = authSlice.actions

export default authSlice.reducer