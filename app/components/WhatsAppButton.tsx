"use client";

import { useState } from 'react';
import { Fab, Box, Typography, Zoom, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '@/state/redux/store';
import { hexToRgba } from '@/utils/style';
import theme from '@/theme/mui';

const WhatsAppButton = () => {
    const [showMessage, setShowMessage] = useState(false);
    const siteConfig = useAppSelector(state => state.auth.siteConfig);
    const isCartOpen = useAppSelector(state => state.shop.isCartOpen);
    const whatsappNumber = siteConfig.socialMedia.whatsapp;

    // Si no hay WhatsApp configurado, no mostrar el botón
    if (!whatsappNumber) {
        return null;
    }

    // Si el carrito está abierto, no mostrar el botón
    if (isCartOpen) {
        return null;
    }

    const handleClick = () => {
        const message = encodeURIComponent('Hola! Me gustaría obtener más información sobre sus productos artesanales.');
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    const toggleMessage = () => {
        setShowMessage(!showMessage);
    };

    return (
        <>
            {/* Mensaje flotante */}
            <Zoom in={showMessage}>
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 90, sm: 100 },
                        right: { xs: 16, sm: 24 },
                        zIndex: 1299,
                        maxWidth: { xs: '260px', sm: '300px' },
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 3,
                            boxShadow: `0 8px 24px ${hexToRgba('#000', 0.15)}`,
                            p: 2.5,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -8,
                                right: 28,
                                width: 0,
                                height: 0,
                                borderLeft: '8px solid transparent',
                                borderRight: '8px solid transparent',
                                borderTop: '8px solid white',
                            }
                        }}
                    >
                        {/* Botón cerrar */}
                        <Box
                            onClick={toggleMessage}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                cursor: 'pointer',
                                color: 'text.secondary',
                                '&:hover': {
                                    color: 'text.primary',
                                }
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </Box>

                        <Typography
                            sx={{
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                mb: 1,
                            }}
                        >
                            ¡Hola! 👋
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: '0.85rem',
                                color: 'text.secondary',
                                lineHeight: 1.5,
                            }}
                        >
                            ¿Necesitas ayuda con nuestros productos? Escríbenos por WhatsApp
                        </Typography>
                    </Box>
                </Box>
            </Zoom>

            {/* Botón flotante */}
            <Tooltip title="Chatea con nosotros" placement="left">
                <Fab
                    color="primary"
                    aria-label="WhatsApp"
                    onClick={handleClick}
                    onMouseEnter={() => setShowMessage(true)}
                    onMouseLeave={() => setShowMessage(false)}
                    sx={{
                        position: 'fixed',
                        bottom: { xs: 20, sm: 24 },
                        right: { xs: 16, sm: 24 },
                        zIndex: 1300,
                        backgroundColor: '#25D366',
                        width: { xs: 56, sm: 64 },
                        height: { xs: 56, sm: 64 },
                        boxShadow: `0 6px 20px ${hexToRgba('#25D366', 0.4)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            backgroundColor: '#128C7E',
                            transform: 'scale(1.1)',
                            boxShadow: `0 8px 28px ${hexToRgba('#25D366', 0.5)}`,
                        },
                        '&:active': {
                            transform: 'scale(1.05)',
                        }
                    }}
                >
                    <WhatsAppIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
                </Fab>
            </Tooltip>
        </>
    );
};

export default WhatsAppButton;