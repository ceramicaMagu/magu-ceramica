import { Generic } from "@/types/global";
import { AuthSlice } from "@/types/auth";
import { loginAsync, getSiteConfigAsync, updateSiteConfigAsync } from "./thunk";

const extraReducersAuth = (builder: Generic) => {
    builder
        // ==========================================
        // LOGIN
        // ==========================================
        .addCase(loginAsync.pending, (state: AuthSlice) => {
            state.status = {
                ...state.status,
                loginAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(loginAsync.fulfilled, (state: AuthSlice, action: any) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.status = {
                ...state.status,
                loginAsync: {
                    response: "fulfilled",
                    message: "Login exitoso",
                    loading: false
                }
            };
        })
        .addCase(loginAsync.rejected, (state: AuthSlice, action: any) => {
            state.status = {
                ...state.status,
                loginAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Credenciales incorrectas",
                    loading: false
                }
            };
        })

        // ==========================================
        // GET SITE CONFIG
        // ==========================================
        .addCase(getSiteConfigAsync.pending, (state: AuthSlice) => {
            state.status = {
                ...state.status,
                getSiteConfigAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(getSiteConfigAsync.fulfilled, (state: AuthSlice, action: any) => {
            const config = action.payload.config;
            state.siteConfig = {
                socialMedia: config.social_media,
                contact: config.contact
            };
            state.status = {
                ...state.status,
                getSiteConfigAsync: {
                    response: "fulfilled",
                    message: "",
                    loading: false
                }
            };
        })
        .addCase(getSiteConfigAsync.rejected, (state: AuthSlice, action: any) => {
            state.status = {
                ...state.status,
                getSiteConfigAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al obtener configuración",
                    loading: false
                }
            };
        })

        // ==========================================
        // UPDATE SITE CONFIG
        // ==========================================
        .addCase(updateSiteConfigAsync.pending, (state: AuthSlice) => {
            state.status = {
                ...state.status,
                updateSiteConfigAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(updateSiteConfigAsync.fulfilled, (state: AuthSlice, action: any) => {
            const config = action.payload.config;
            state.siteConfig = {
                socialMedia: config.social_media,
                contact: config.contact
            };
            state.status = {
                ...state.status,
                updateSiteConfigAsync: {
                    response: "fulfilled",
                    message: "Configuración actualizada exitosamente",
                    loading: false
                }
            };
        })
        .addCase(updateSiteConfigAsync.rejected, (state: AuthSlice, action: any) => {
            state.status = {
                ...state.status,
                updateSiteConfigAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al actualizar configuración",
                    loading: false
                }
            };
        });
};

export default extraReducersAuth;
