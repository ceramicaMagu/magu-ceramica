import instanceAxios from "@/state/axios/config";
import { LoginCredentials, User, SiteConfig } from "@/types/auth";

// ==========================================
// AUTH APIs
// ==========================================

export interface LoginResponse {
    success: boolean;
    user: User;
    token: string;
}

/**
 * Login con Supabase
 * POST /api/auth/login
 */
export const loginApi = (credentials: LoginCredentials) => {
    return instanceAxios.post<LoginResponse>("/auth/login", credentials);
};

// ==========================================
// SITE CONFIG APIs
// ==========================================

export interface ConfigResponse {
    success: boolean;
    config: {
        id: number;
        social_media: {
            instagram?: string;
            facebook?: string;
            twitter?: string;
            whatsapp?: string;
        };
        contact: {
            email: string;
            phone: string;
            address?: string;
        };
        updated_at: string;
    };
}

/**
 * Obtener configuración del sitio
 * GET /api/config
 */
export const getSiteConfigApi = () => {
    return instanceAxios.get<ConfigResponse>("/config");
};

/**
 * Actualizar configuración del sitio
 * PUT /api/config
 */
export const updateSiteConfigApi = (config: SiteConfig, token: string) => {
    return instanceAxios.put<ConfigResponse>(
        "/config",
        config,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
};
