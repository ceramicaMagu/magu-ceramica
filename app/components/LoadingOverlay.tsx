"use client";

import { Backdrop, Box, Typography, keyframes } from "@mui/material";

interface LoadingOverlayProps {
    open: boolean;
    message?: string;
}

// Animación de pulsación suave
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Animación de rotación del círculo exterior
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Animación de fade in para el texto
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoadingOverlay = ({ open, message = "Cargando..." }: LoadingOverlayProps) => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1500,
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
            }}
            open={open}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                {/* Contenedor del logo con círculo animado */}
                <Box
                    sx={{
                        position: "relative",
                        width: 180,
                        height: 180,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* Círculo exterior rotatorio */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            border: "3px solid transparent",
                            borderTopColor: "#E66B91",
                            borderRightColor: "#A8D6D4",
                            borderRadius: "50%",
                            animation: `${rotate} 1.5s linear infinite`,
                        }}
                    />

                    {/* Círculo secundario (más pequeño y lento) */}
                    <Box
                        sx={{
                            position: "absolute",
                            width: "85%",
                            height: "85%",
                            border: "2px solid transparent",
                            borderBottomColor: "#E66B91",
                            borderLeftColor: "#A8D6D4",
                            borderRadius: "50%",
                            animation: `${rotate} 2s linear infinite reverse`,
                        }}
                    />

                    {/* Logo con animación de pulsación */}
                    <Box
                        component="img"
                        src="/iconoLogo.webp"
                        alt="Magu Cerámica"
                        sx={{
                            width: 120,
                            height: 120,
                            objectFit: "contain",
                            animation: `${pulse} 2s ease-in-out infinite`,
                            filter: "drop-shadow(0 4px 12px rgba(230, 107, 145, 0.2))",
                        }}
                    />
                </Box>

                {/* Texto del mensaje */}
                <Typography
                    sx={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: "#333",
                        textAlign: "center",
                        animation: `${fadeIn} 0.5s ease-out`,
                        letterSpacing: "0.5px",
                    }}
                >
                    {message}
                </Typography>

                {/* Puntos de carga animados */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        animation: `${fadeIn} 0.5s ease-out 0.2s both`,
                    }}
                >
                    {[0, 1, 2].map((i) => (
                        <Box
                            key={i}
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: i % 2 === 0 ? "#E66B91" : "#A8D6D4",
                                animation: `${pulse} 1.5s ease-in-out infinite`,
                                animationDelay: `${i * 0.2}s`,
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Backdrop>
    );
};

export default LoadingOverlay;
