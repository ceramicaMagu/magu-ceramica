"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import {
    Box,
    Button,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    FormControlLabel,
    Switch,
    Alert,
    ToggleButtonGroup,
    ToggleButton,
    CircularProgress,
    Snackbar,
    Typography,
    IconButton,
} from "@mui/material";
import { CloudUpload, Link as LinkIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { addProduct, updateProduct } from "@/state/redux/shop";
import { Product } from "@/types/shop";
import { validateRequired, validateUrl, validatePrice } from "@/utils/validation";
import { uploadMultipleImages, deleteImageFromStorage } from "@/utils/imageUpload";

// Animación de shake para campos con error
const shakeAnimation = {
    '@keyframes shake': {
        '0%, 100%': { transform: 'translateX(0)' },
        '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
        '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
    },
    animation: 'shake 0.5s',
};

interface ProductFormProps {
    product: Product | null;
    onClose: () => void;
    viewMode?: boolean;
}

const ProductForm = ({ product, onClose, viewMode = false }: ProductFormProps) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const products = useAppSelector(state => state.shop.products);
    const categories = useAppSelector(state => state.shop.categories);

    const [formData, setFormData] = useState<Omit<Product, 'id'> & { id?: number }>({
        name: "",
        image: "",
        images: [],
        price: 0,
        description: "",
        category: categories[0]?.name || "",
        stock: 999, // Stock siempre disponible
        featured: false,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
    const [priceInput, setPriceInput] = useState<string>("");
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (product) {
            setFormData({
                ...product,
                images: product.images || [product.image].filter(Boolean),
            });
            setImagePreviews(product.images || [product.image].filter(Boolean));
            setPriceInput(product.price.toString());
        }
    }, [product]);

    const handleChange = (field: keyof typeof formData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpiar error del campo
        if (validationErrors[field]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleImageUrlChange = (url: string) => {
        if (!url.trim()) return;

        // Validar máximo 5 imágenes
        if (imagePreviews.length >= 5) {
            setError('Máximo 5 imágenes permitidas');
            return;
        }

        const newImages = [...imagePreviews, url];
        setImagePreviews(newImages);
        setFormData(prev => ({
            ...prev,
            images: newImages,
            image: newImages[0], // Primera imagen como principal
        }));

        // Limpiar error de imagen
        if (validationErrors.images) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.images;
                return newErrors;
            });
        }
    };

    const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Validar máximo 5 imágenes
        if (imagePreviews.length >= 5) {
            setError('Máximo 5 imágenes permitidas');
            return;
        }

        // Calcular cuántas imágenes se pueden agregar
        const availableSlots = 5 - imagePreviews.length;
        const filesToProcess = Array.from(files)
            .filter(file => file.type.startsWith('image/'))
            .slice(0, availableSlots);

        if (filesToProcess.length === 0) {
            setError('No se seleccionaron imágenes válidas');
            return;
        }

        try {
            setLoading(true);
            setError('');

            // Subir imágenes a Supabase Storage
            const result = await uploadMultipleImages(filesToProcess, 'products', availableSlots, token || undefined);

            // Mostrar errores si hubo
            if (result.errors.length > 0) {
                setError(result.errors.join('\n'));
            }

            if (result.urls.length === 0) {
                setLoading(false);
                return;
            }

            const updatedImages = [...imagePreviews, ...result.urls];
            setImagePreviews(updatedImages);
            setFormData(prev => ({
                ...prev,
                images: updatedImages,
                image: updatedImages[0], // Primera imagen como principal
            }));

            // Limpiar errores de validación
            if (validationErrors.images) {
                setValidationErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.images;
                    return newErrors;
                });
            }

            setLoading(false);
        } catch (error) {
            console.error('Error al procesar imágenes:', error);
            const message = error instanceof Error ? error.message : 'Error desconocido';
            setError(`Error inesperado: ${message}`);
            setLoading(false);
        }

        // Resetear input para permitir seleccionar las mismas imágenes nuevamente
        e.target.value = '';
    };

    const handleDeleteImage = async (index: number) => {
        const imageToDelete = imagePreviews[index];

        // Si es una imagen de Supabase Storage, eliminarla
        if (imageToDelete.includes('supabase')) {
            await deleteImageFromStorage(imageToDelete, token || undefined);
        }

        const newImages = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(newImages);
        setFormData(prev => ({
            ...prev,
            images: newImages,
            image: newImages[0] || '', // Primera imagen como principal
        }));
    };

    const handlePriceChange = (value: string) => {
        // Permitir solo números y un punto decimal
        const regex = /^\d*\.?\d*$/;
        if (regex.test(value) || value === '') {
            setPriceInput(value);
            const numericValue = parseFloat(value) || 0;
            setFormData(prev => ({ ...prev, price: numericValue }));

            // Limpiar error de precio
            if (validationErrors.price) {
                setValidationErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.price;
                    return newErrors;
                });
            }
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        // Validar nombre
        const nameValidation = validateRequired(formData.name, 'nombre del producto');
        if (!nameValidation.isValid) {
            errors.name = nameValidation.error!;
        }

        // Validar que haya al menos una imagen
        if (!formData.images || formData.images.length === 0) {
            errors.images = 'Debes agregar al menos una imagen';
        }

        // Validar categoría
        const categoryValidation = validateRequired(formData.category, 'categoría');
        if (!categoryValidation.isValid) {
            errors.category = categoryValidation.error!;
        }

        // Validar descripción
        const descriptionValidation = validateRequired(formData.description, 'descripción');
        if (!descriptionValidation.isValid) {
            errors.description = descriptionValidation.error!;
        }

        // Validar precio
        const priceValidation = validatePrice(formData.price);
        if (!priceValidation.isValid) {
            errors.price = priceValidation.error!;
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        // Validar campos
        if (!validateForm()) {
            setError("Por favor completa todos los campos requeridos");
            return;
        }

        setLoading(true);

        try {
            // Generar ID para nuevo producto
            const productData: Product = {
                ...formData,
                id: formData.id || Math.max(...products.map(p => p.id), 0) + 1,
            };

            const isEdit = !!product;
            const response = await fetch("/api/products", {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const data = await response.json();
                setToast({
                    open: true,
                    message: data.error || "Error al guardar el producto",
                    severity: 'error'
                });
                setLoading(false);
                return;
            }

            // Actualizar Redux
            if (isEdit) {
                dispatch(updateProduct(productData));
            } else {
                dispatch(addProduct(productData));
            }

            // Mostrar toast de éxito
            setToast({
                open: true,
                message: isEdit ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente',
                severity: 'success'
            });

            // Cerrar después de un breve delay
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setToast({
                open: true,
                message: "Error de conexión. Intenta nuevamente.",
                severity: 'error'
            });
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <DialogTitle>
                {viewMode ? "Ver Producto" : product ? "Editar Producto" : "Agregar Producto"}
            </DialogTitle>

            <DialogContent>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Nombre del Producto"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        fullWidth
                        disabled={viewMode}
                        error={!!validationErrors.name}
                        helperText={validationErrors.name || ""}
                        sx={validationErrors.name ? shakeAnimation : {}}
                    />

                    {/* Método de carga de imágenes */}
                    {!viewMode && (
                        <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                                Imágenes del Producto (máximo 5)
                            </Typography>

                            <ToggleButtonGroup
                                value={uploadMethod}
                                exclusive
                                onChange={(_e, newMethod) => newMethod && setUploadMethod(newMethod)}
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                <ToggleButton value="url">
                                    <LinkIcon sx={{ mr: 1 }} />
                                    URL
                                </ToggleButton>
                                <ToggleButton value="file">
                                    <CloudUpload sx={{ mr: 1 }} />
                                    Subir Archivo
                                </ToggleButton>
                            </ToggleButtonGroup>

                            {uploadMethod === 'url' ? (
                                <TextField
                                    label="URL de la Imagen"
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    fullWidth
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const input = e.target as HTMLInputElement;
                                            handleImageUrlChange(input.value);
                                            input.value = '';
                                        }
                                    }}
                                    helperText={validationErrors.images || `Presiona Enter para agregar (${imagePreviews.length}/5)`}
                                    error={!!validationErrors.images}
                                    disabled={imagePreviews.length >= 5}
                                    sx={validationErrors.images ? shakeAnimation : {}}
                                />
                            ) : (
                                <Box>
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<AddIcon />}
                                        sx={{
                                            py: 2,
                                            borderColor: validationErrors.images ? 'error.main' : undefined,
                                            color: validationErrors.images ? 'error.main' : undefined
                                        }}
                                        disabled={loading || imagePreviews.length >= 5}
                                    >
                                        {loading ? 'Procesando imágenes...' : `Agregar Imágenes (${imagePreviews.length}/5)`}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageFileChange}
                                        />
                                    </Button>
                                    {validationErrors.images && (
                                        <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, ml: 1.75 }}>
                                            {validationErrors.images}
                                        </Box>
                                    )}
                                </Box>
                            )}

                            {/* Grid de previews */}
                            {imagePreviews.length > 0 && (
                                <Box sx={{
                                    mt: 2,
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                    gap: 2
                                }}>
                                    {imagePreviews.map((preview, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                position: 'relative',
                                                paddingTop: '100%',
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                border: index === 0 ? '2px solid' : '1px solid',
                                                borderColor: index === 0 ? 'primary.main' : 'divider',
                                            }}
                                        >
                                            {index === 0 && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 4,
                                                        left: 4,
                                                        backgroundColor: 'primary.main',
                                                        color: 'white',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontSize: '0.65rem',
                                                        fontWeight: 600,
                                                        zIndex: 2,
                                                    }}
                                                >
                                                    Principal
                                                </Box>
                                            )}
                                            <Box
                                                component="img"
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteImage(index)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 4,
                                                    right: 4,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'error.main',
                                                    },
                                                    zIndex: 2,
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    )}

                    {viewMode && formData.images && formData.images.length > 0 && (
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                            gap: 2
                        }}>
                            {formData.images.map((img, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        position: 'relative',
                                        paddingTop: '100%',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`${formData.name} - ${index + 1}`}
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            ))}
                        </Box>
                    )}

                    <TextField
                        label="Categoría"
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        select
                        required
                        fullWidth
                        disabled={viewMode}
                        error={!!validationErrors.category}
                        helperText={validationErrors.category || (categories.length === 0 ? "⚠️ Primero crea categorías en la pestaña de Categorías" : "")}
                        sx={validationErrors.category ? shakeAnimation : {}}
                    >
                        {categories.length === 0 ? (
                            <MenuItem value="" disabled>
                                No hay categorías disponibles
                            </MenuItem>
                        ) : (
                            categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.name}>
                                    {cat.name}
                                </MenuItem>
                            ))
                        )}
                    </TextField>

                    <TextField
                        label="Precio"
                        type="text"
                        value={priceInput}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        required
                        fullWidth
                        disabled={viewMode}
                        error={!!validationErrors.price}
                        helperText={validationErrors.price || "Ingresa solo números"}
                        placeholder="0"
                        sx={validationErrors.price ? shakeAnimation : {}}
                    />

                    <TextField
                        label="Descripción"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        required
                        fullWidth
                        multiline
                        rows={4}
                        disabled={viewMode}
                        error={!!validationErrors.description}
                        helperText={validationErrors.description || ""}
                        sx={validationErrors.description ? shakeAnimation : {}}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={formData.featured || false}
                                onChange={(e) => handleChange('featured', e.target.checked)}
                                disabled={viewMode}
                            />
                        }
                        label="Producto Destacado"
                    />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 2 }}>
                <Button onClick={onClose} variant="outlined" disabled={loading}>
                    {viewMode ? "Cerrar" : "Cancelar"}
                </Button>
                {!viewMode && (
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
                    >
                        {loading ? "Guardando..." : product ? "Actualizar" : "Agregar"}
                    </Button>
                )}
            </DialogActions>

            {/* Toast de notificaciones */}
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
        </Box>
    );
};

export default ProductForm;
