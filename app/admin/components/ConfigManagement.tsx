"use client";

import { useState, FormEvent } from "react";
import {
    Box,
    Button,
    Paper,
    Typography,
    TextField,
    Alert,
    Divider,
} from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { updateSiteConfig } from "@/state/redux/auth";
import { SiteConfig } from "@/types/auth";
import { validateEmail, validatePhone, validateUrl } from "@/utils/validation";
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

interface FieldErrors {
    [key: string]: string;
}

const ConfigManagement = () => {
    const dispatch = useAppDispatch();
    const siteConfig = useAppSelector(state => state.auth.siteConfig);
    const token = useAppSelector(state => state.auth.token);

    const [formData, setFormData] = useState<SiteConfig>(siteConfig);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const handleChange = (section: keyof SiteConfig, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            }
        }));

        // Limpiar error del campo al escribir
        const fieldKey = `${section}.${field}`;
        if (fieldErrors[fieldKey]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldKey];
                return newErrors;
            });
        }
    };

    const validateForm = (): boolean => {
        const errors: FieldErrors = {};

        // Validar redes sociales (solo si tienen valor)
        if (formData.socialMedia.instagram) {
            const instagramValidation = validateUrl(formData.socialMedia.instagram, 'URL de Instagram');
            if (!instagramValidation.isValid) {
                errors['socialMedia.instagram'] = instagramValidation.error!;
            }
        }

        if (formData.socialMedia.facebook) {
            const facebookValidation = validateUrl(formData.socialMedia.facebook, 'URL de Facebook');
            if (!facebookValidation.isValid) {
                errors['socialMedia.facebook'] = facebookValidation.error!;
            }
        }

        if (formData.socialMedia.twitter) {
            const twitterValidation = validateUrl(formData.socialMedia.twitter, 'URL de Twitter');
            if (!twitterValidation.isValid) {
                errors['socialMedia.twitter'] = twitterValidation.error!;
            }
        }

        if (formData.socialMedia.linkedin) {
            const linkedinValidation = validateUrl(formData.socialMedia.linkedin, 'URL de LinkedIn');
            if (!linkedinValidation.isValid) {
                errors['socialMedia.linkedin'] = linkedinValidation.error!;
            }
        }

        if (formData.socialMedia.tiktok) {
            const tiktokValidation = validateUrl(formData.socialMedia.tiktok, 'URL de TikTok');
            if (!tiktokValidation.isValid) {
                errors['socialMedia.tiktok'] = tiktokValidation.error!;
            }
        }

        if (formData.socialMedia.whatsapp) {
            const whatsappValidation = validatePhone(formData.socialMedia.whatsapp, 'WhatsApp');
            if (!whatsappValidation.isValid) {
                errors['socialMedia.whatsapp'] = whatsappValidation.error!;
            }
        }

        // Validar contacto (campos requeridos)
        const emailValidation = validateEmail(formData.contact.email);
        if (!emailValidation.isValid) {
            errors['contact.email'] = emailValidation.error!;
        }

        const phoneValidation = validatePhone(formData.contact.phone, 'teléfono');
        if (!phoneValidation.isValid) {
            errors['contact.phone'] = phoneValidation.error!;
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validar formulario antes de enviar
        if (!validateForm()) {
            setError("Por favor corrige los errores en el formulario");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/config", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || "Error al actualizar la configuración");
                setLoading(false);
                return;
            }

            // Actualizar Redux
            dispatch(updateSiteConfig(formData));
            setSuccess("Configuración actualizada correctamente");
            setLoading(false);

            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Error de conexión. Intenta nuevamente.");
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={classes.sectionTitle}>
                Configuración del Sitio
            </Typography>

            {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    {success}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Paper sx={classes.paper}>
                <Box component="form" onSubmit={handleSubmit}>
                    {/* Redes Sociales */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={classes.subsectionTitle}>
                            Redes Sociales
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                            <TextField
                                fullWidth
                                label="Instagram"
                                value={formData.socialMedia.instagram || ""}
                                onChange={(e) => handleChange('socialMedia', 'instagram', e.target.value)}
                                placeholder="https://instagram.com/usuario"
                                error={!!fieldErrors['socialMedia.instagram']}
                                helperText={fieldErrors['socialMedia.instagram'] || "Deja vacío para ocultar del sitio"}
                                sx={fieldErrors['socialMedia.instagram'] ? shakeAnimation : {}}
                            />

                            <TextField
                                fullWidth
                                label="Facebook"
                                value={formData.socialMedia.facebook || ""}
                                onChange={(e) => handleChange('socialMedia', 'facebook', e.target.value)}
                                placeholder="https://facebook.com/pagina"
                                error={!!fieldErrors['socialMedia.facebook']}
                                helperText={fieldErrors['socialMedia.facebook'] || "Deja vacío para ocultar del sitio"}
                                sx={fieldErrors['socialMedia.facebook'] ? shakeAnimation : {}}
                            />

                            <TextField
                                fullWidth
                                label="Twitter"
                                value={formData.socialMedia.twitter || ""}
                                onChange={(e) => handleChange('socialMedia', 'twitter', e.target.value)}
                                placeholder="https://twitter.com/usuario"
                                error={!!fieldErrors['socialMedia.twitter']}
                                helperText={fieldErrors['socialMedia.twitter'] || "Deja vacío para ocultar del sitio"}
                                sx={fieldErrors['socialMedia.twitter'] ? shakeAnimation : {}}
                            />

                            <TextField
                                fullWidth
                                label="LinkedIn"
                                value={formData.socialMedia.linkedin || ""}
                                onChange={(e) => handleChange('socialMedia', 'linkedin', e.target.value)}
                                placeholder="https://linkedin.com/company/empresa"
                                error={!!fieldErrors['socialMedia.linkedin']}
                                helperText={fieldErrors['socialMedia.linkedin'] || "Deja vacío para ocultar del sitio"}
                                sx={fieldErrors['socialMedia.linkedin'] ? shakeAnimation : {}}
                            />

                            <TextField
                                fullWidth
                                label="TikTok"
                                value={formData.socialMedia.tiktok || ""}
                                onChange={(e) => handleChange('socialMedia', 'tiktok', e.target.value)}
                                placeholder="https://tiktok.com/@usuario"
                                error={!!fieldErrors['socialMedia.tiktok']}
                                helperText={fieldErrors['socialMedia.tiktok'] || "Deja vacío para ocultar del sitio"}
                                sx={fieldErrors['socialMedia.tiktok'] ? shakeAnimation : {}}
                            />

                            <TextField
                                fullWidth
                                label="WhatsApp"
                                value={formData.socialMedia.whatsapp || ""}
                                onChange={(e) => handleChange('socialMedia', 'whatsapp', e.target.value)}
                                placeholder="+5491112345678"
                                error={!!fieldErrors['socialMedia.whatsapp']}
                                helperText={fieldErrors['socialMedia.whatsapp'] || "Número con código de país"}
                                sx={fieldErrors['socialMedia.whatsapp'] ? shakeAnimation : {}}
                            />
                        </Box>
                    </Box>

                    {/* Información de Contacto */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={classes.subsectionTitle}>
                            Información de Contacto
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Email"
                                    type="email"
                                    value={formData.contact.email}
                                    onChange={(e) => handleChange('contact', 'email', e.target.value)}
                                    placeholder="contacto@ejemplo.com"
                                    error={!!fieldErrors['contact.email']}
                                    helperText={fieldErrors['contact.email']}
                                    sx={fieldErrors['contact.email'] ? shakeAnimation : {}}
                                />

                                <TextField
                                    fullWidth
                                    required
                                    label="Teléfono"
                                    value={formData.contact.phone}
                                    onChange={(e) => handleChange('contact', 'phone', e.target.value)}
                                    placeholder="+54 9 11 1234-5678"
                                    error={!!fieldErrors['contact.phone']}
                                    helperText={fieldErrors['contact.phone']}
                                    sx={fieldErrors['contact.phone'] ? shakeAnimation : {}}
                                />
                            </Box>

                            <TextField
                                fullWidth
                                label="Dirección"
                                value={formData.contact.address || ""}
                                onChange={(e) => handleChange('contact', 'address', e.target.value)}
                                placeholder="Ciudad, País"
                            />
                        </Box>
                    </Box>

                    {/* Botón de Guardar */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<SaveOutlined />}
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default ConfigManagement;
