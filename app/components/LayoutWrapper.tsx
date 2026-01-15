"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Box, Container } from "@mui/material";
import NavBar from "./navBar";
import Footer from "./footer";
import WhatsAppButton from "./WhatsAppButton";
import { useAppDispatch } from "@/state/redux/store";
import { getSiteConfigAsync } from "@/state/redux/auth/thunk";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    // Cargar configuración del sitio al montar
    useEffect(() => {
        dispatch(getSiteConfigAsync());
    }, [dispatch]);

    // Rutas que no deben mostrar navbar y footer
    const hideNavAndFooter = pathname.startsWith('/admin') || pathname === '/login';

    if (hideNavAndFooter) {
        return (
            <Box sx={{ minHeight: '100vh' }}>
                {children}
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header>
                <NavBar />
            </header>

            <main style={{ flex: 1, paddingTop: '86px' }}>
                <Container maxWidth="xl">
                    {children}
                </Container>
            </main>

            <Footer />

            {/* Botón flotante de WhatsApp */}
            <WhatsAppButton />
        </Box>
    );
};

export default LayoutWrapper;
