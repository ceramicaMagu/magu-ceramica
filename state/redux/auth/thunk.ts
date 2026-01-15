import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, getSiteConfigApi, updateSiteConfigApi } from "./api";
import { LoginCredentials, SiteConfig } from "@/types/auth";

// ==========================================
// LOGIN THUNK
// ==========================================

export const loginAsync = createAsyncThunk(
    "auth/login",
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await loginApi(credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al iniciar sesión" });
        }
    }
);

// ==========================================
// SITE CONFIG THUNKS
// ==========================================

export const getSiteConfigAsync = createAsyncThunk(
    "auth/getSiteConfig",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getSiteConfigApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al obtener configuración" });
        }
    }
);

export const updateSiteConfigAsync = createAsyncThunk(
    "auth/updateSiteConfig",
    async ({ config, token }: { config: SiteConfig; token: string }, { rejectWithValue }) => {
        try {
            const response = await updateSiteConfigApi(config, token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al actualizar configuración" });
        }
    }
);
