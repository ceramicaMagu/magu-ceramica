import { AuthSlice } from "@/types/auth"

const initialState: AuthSlice = {
    user: null,
    isAuthenticated: false,
    token: null,
    siteConfig: {
        socialMedia: {
            instagram: '',
            facebook: '',
            twitter: '',
            linkedin: '',
            tiktok: '',
            whatsapp: '',
        },
        contact: {
            email: '',
            phone: '',
            address: '',
        }
    },
    status: {}
}

export default initialState