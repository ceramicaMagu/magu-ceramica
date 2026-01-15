"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Tabs, Tab, Button, CircularProgress } from "@mui/material";
import { LogoutOutlined, Inventory2Outlined, SettingsOutlined, CategoryOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { logout } from "@/state/redux/auth";
import { useAuthInterceptor } from "@/hooks/useAuthInterceptor";
import { useSessionCheck } from "@/hooks/useSessionCheck";
import classes from "./classes";
import ProductManagement from "./components/ProductManagement";
import CategoryManagement from "./components/CategoryManagement";
import ConfigManagement from "./components/ConfigManagement";

const AdminPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector(state => state.auth);

    // Interceptar respuestas de API para detectar sesión expirada
    useAuthInterceptor();

    // Verificar sesión periódicamente cada 5 minutos
    useSessionCheck(5 * 60 * 1000);

    const [currentTab, setCurrentTab] = useState(0);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Verificar autenticación
        if (!isAuthenticated || !user || user.role !== 'admin') {
            router.push('/login');
        } else {
            setIsChecking(false);
        }
    }, [isAuthenticated, user, router]);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    // Mostrar loading mientras verifica autenticación
    if (isChecking) {
        return (
            <Box sx={classes.loadingContainer}>
                <CircularProgress size={60} />
                <Typography sx={{ mt: 2 }}>Verificando acceso...</Typography>
            </Box>
        );
    }

    // Si no está autenticado, no mostrar nada (se redirigirá)
    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <Box sx={classes.root}>
            {/* Header */}
            <Box sx={classes.header}>
                <Container maxWidth="xl">
                    <Box sx={classes.headerContent}>
                        <Box>
                            <Typography variant="h4" sx={classes.headerTitle}>
                                Panel de Administración
                            </Typography>
                            <Typography sx={classes.headerSubtitle}>
                                Bienvenido, {user.name}
                            </Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<LogoutOutlined />}
                            onClick={handleLogout}
                            sx={classes.logoutButton}
                        >
                            Cerrar Sesión
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Navigation Tabs */}
            <Box sx={classes.tabsContainer}>
                <Container maxWidth="xl">
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        sx={classes.tabs}
                    >
                        <Tab
                            icon={<Inventory2Outlined />}
                            label="Gestión de Productos"
                            iconPosition="start"
                            sx={classes.tab}
                        />
                        <Tab
                            icon={<CategoryOutlined />}
                            label="Gestión de Categorías"
                            iconPosition="start"
                            sx={classes.tab}
                        />
                        <Tab
                            icon={<SettingsOutlined />}
                            label="Configuración"
                            iconPosition="start"
                            sx={classes.tab}
                        />
                    </Tabs>
                </Container>
            </Box>

            {/* Content */}
            <Container maxWidth="xl" sx={classes.content}>
                {currentTab === 0 && <ProductManagement />}
                {currentTab === 1 && <CategoryManagement />}
                {currentTab === 2 && <ConfigManagement />}
            </Container>
        </Box>
    );
};

export default AdminPage;
