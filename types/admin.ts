import { StatusMap } from "./redux";

export type User = {
    id: string;
    email: string;
    role: 'admin' | 'user';
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type SiteConfig = {
    socialMedia: {
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
};

export type AuthSlice = {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    siteConfig: SiteConfig;
    status: StatusMap;
};
