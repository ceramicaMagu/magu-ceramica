/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, TextField, Button, Typography, Alert, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useAppDispatch } from "@/state/redux/store";
import { setUser } from "@/state/redux/auth";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { validateEmail, validatePassword } from "@/utils/validation";
import classes from "./classes";

// Animación de shake para campos con error
const shakeAnimation = {
    '@keyframes shake': {
        '0%, 100%': { transform: 'translateX(0)' },
        '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
        '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
    },
    animation: 'shake 0.5s',
};

const LoginPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setEmailError("");
        setPasswordError("");

        // Validar campos
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);

        if (!emailValidation.isValid || !passwordValidation.isValid) {
            if (!emailValidation.isValid) {
                setEmailError(emailValidation.error!);
            }
            if (!passwordValidation.isValid) {
                setPasswordError(passwordValidation.error!);
            }
            setError("Por favor corrige los errores en el formulario");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Error al iniciar sesión");
                setLoading(false);
                return;
            }

            // Guardar usuario y token en Redux
            dispatch(setUser({ user: data.user, token: data.token }));

            // Redirigir al panel de admin
            router.push("/admin");
        } catch (err) {
            setError("Error de conexión. Intenta nuevamente.");
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingOverlay
                open={loading}
                message="Iniciando sesión..."
            />
            <Box sx={classes.root}>
                <Container maxWidth="sm">
                <Box sx={classes.content}>
                    <Paper elevation={3} sx={classes.paper}>
                        <Box sx={classes.iconContainer}>
                            <LockOutlined sx={classes.icon} />
                        </Box>

                        <Typography variant="h4" sx={classes.title}>
                            Iniciar Sesión
                        </Typography>

                        <Typography sx={classes.subtitle}>
                            Panel de Administración - Magu Cerámica
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit} sx={classes.form}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError("");
                                }}
                                required
                                autoComplete="email"
                                autoFocus
                                error={!!emailError}
                                helperText={emailError}
                                sx={emailError ? { ...classes.input, ...shakeAnimation } : classes.input}
                            />

                            <TextField
                                fullWidth
                                label="Contraseña"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                required
                                autoComplete="current-password"
                                error={!!passwordError}
                                helperText={passwordError}
                                sx={passwordError ? { ...classes.input, ...shakeAnimation } : classes.input}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={classes.button}
                            >
                                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
        </>
    );
};

export default LoginPage;
