"use client";

import { useState, useEffect } from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import { CloseOutlined, ImageOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { addCategory, updateCategory } from "@/state/redux/shop";
import { Category } from "@/types/shop";
import { optimizeImage } from "@/utils/image-optimizer";
import { validateRequired } from "@/utils/validation";

// Animación de shake para campos con error
const shakeAnimation = {
    '@keyframes shake': {
        '0%, 100%': { transform: 'translateX(0)' },
        '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
        '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
    },
    animation: 'shake 0.5s',
};

interface CategoryFormProps {
    category: Category | null;
    onClose: () => void;
    viewMode?: boolean;
}

const CategoryForm = ({ category, onClose, viewMode = false }: CategoryFormProps) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);

    const [formData, setFormData] = useState({
        name: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });
    const [imagePreview, setImagePreview] = useState<string>("");
    const [fieldErrors, setFieldErrors] = useState<{ name?: string; image?: string }>({});

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                image: category.image,
            });
            setImagePreview(category.image);
        }
    }, [category]);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Limpiar error del campo
        if (fieldErrors[field as keyof typeof fieldErrors]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field as keyof typeof fieldErrors];
                return newErrors;
            });
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);

            // Optimizar imagen
            const optimizedImage = await optimizeImage(file);

            setFormData(prev => ({ ...prev, image: optimizedImage }));
            setImagePreview(optimizedImage);

            // Limpiar error de imagen
            if (fieldErrors.image) {
                setFieldErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.image;
                    return newErrors;
                });
            }

            setToast({
                open: true,
                message: 'Imagen cargada y optimizada correctamente',
                severity: 'success'
            });
        } catch {
            setToast({
                open: true,
                message: 'Error al cargar la imagen',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const errors: { name?: string; image?: string } = {};

        // Validar nombre
        const nameValidation = validateRequired(formData.name, 'nombre de la categoría');
        if (!nameValidation.isValid) {
            errors.name = nameValidation.error!;
        }

        // Validar imagen
        const imageValidation = validateRequired(formData.image, 'imagen');
        if (!imageValidation.isValid) {
            errors.image = 'Debes subir una imagen para la categoría';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        // Validar formulario
        if (!validateForm()) {
            setToast({
                open: true,
                message: 'Por favor corrige los errores en el formulario',
                severity: 'error'
            });
            return;
        }

        setLoading(true);

        try {
            const url = category ? "/api/categories" : "/api/categories";
            const method = category ? "PUT" : "POST";
            const body = category
                ? { ...formData, id: category.id }
                : formData;

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const data = await response.json();

                if (category) {
                    dispatch(updateCategory(data.category));
                    setToast({
                        open: true,
                        message: 'Categoría actualizada exitosamente',
                        severity: 'success'
                    });
                } else {
                    dispatch(addCategory(data.category));
                    setToast({
                        open: true,
                        message: 'Categoría creada exitosamente',
                        severity: 'success'
                    });
                }

                setTimeout(() => {
                    onClose();
                }, 1500);
            } else {
                const data = await response.json();
                setToast({
                    open: true,
                    message: data.error || 'Error al guardar la categoría',
                    severity: 'error'
                });
            }
        } catch {
            setToast({
                open: true,
                message: 'Error de conexión. Intenta nuevamente.',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                    {viewMode ? 'Ver Categoría' : category ? 'Editar Categoría' : 'Nueva Categoría'}
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseOutlined />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
                    {/* Nombre */}
                    <TextField
                        label="Nombre"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        fullWidth
                        required
                        disabled={viewMode}
                        error={!!fieldErrors.name}
                        helperText={fieldErrors.name || ""}
                        sx={fieldErrors.name ? shakeAnimation : {}}
                    />

                    {/* Imagen */}
                    <Box sx={fieldErrors.image ? shakeAnimation : {}}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                mb: 1,
                                color: fieldErrors.image ? 'error.main' : 'text.primary'
                            }}
                        >
                            Imagen de la categoría *
                        </Typography>

                        {!viewMode && (
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<ImageOutlined />}
                                fullWidth
                                disabled={loading}
                                sx={{
                                    mb: 2,
                                    borderColor: fieldErrors.image ? 'error.main' : undefined,
                                    color: fieldErrors.image ? 'error.main' : undefined
                                }}
                            >
                                {imagePreview ? "Cambiar Imagen" : "Subir Imagen"}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Button>
                        )}

                        {fieldErrors.image && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'error.main',
                                    display: 'block',
                                    mb: 2,
                                    ml: 1.75
                                }}
                            >
                                {fieldErrors.image}
                            </Typography>
                        )}

                        {imagePreview && (
                            <Box
                                component="img"
                                src={imagePreview}
                                alt="Preview"
                                sx={{
                                    width: '100%',
                                    maxHeight: 300,
                                    objectFit: 'contain',
                                    borderRadius: 1,
                                    border: '1px solid',
                                    borderColor: fieldErrors.image ? 'error.main' : 'divider'
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </DialogContent>

            {!viewMode && (
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : category ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            )}

            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    onClose={() => setToast({ ...toast, open: false })}
                    severity={toast.severity}
                    sx={{ width: '100%' }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default CategoryForm;
