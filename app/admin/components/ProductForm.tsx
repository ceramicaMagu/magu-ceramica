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
} from "@mui/material";
import { CloudUpload, Link as LinkIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { addProduct, updateProduct } from "@/state/redux/shop";
import { Product } from "@/types/shop";
import { validateRequired, validateUrl, validatePrice } from "@/utils/validation";
import imageCompression from 'browser-image-compression';

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
        price: 0,
        description: "",
        category: categories[0]?.name || "",
        stock: 999, // Stock siempre disponible
        featured: false,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");
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
            setFormData(product);
            setImagePreview(product.image);
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
        setFormData(prev => ({ ...prev, image: url }));
        setImagePreview(url);

        // Limpiar error de imagen
        if (validationErrors.image) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.image;
                return newErrors;
            });
        }
    };

    const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                setError('Por favor selecciona un archivo de imagen válido');
                return;
            }

            try {
                setLoading(true);

                // Opciones de compresión
                const options = {
                    maxSizeMB: 0.5, // Máximo 500KB
                    maxWidthOrHeight: 1024, // Máximo 1024px en cualquier dimensión
                    useWebWorker: true,
                    fileType: 'image/jpeg' as const, // Convertir a JPEG para mejor compresión
                };

                // Comprimir imagen
                const compressedFile = await imageCompression(file, options);

                // Convertir a Base64
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    setImagePreview(base64String);
                    setFormData(prev => ({ ...prev, image: base64String }));
                    setLoading(false);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                setError('Error al procesar la imagen');
                setLoading(false);
            }
        }
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

        // Validar imagen
        if (uploadMethod === 'url') {
            const imageValidation = validateUrl(formData.image, 'URL de la imagen');
            if (!imageValidation.isValid) {
                errors.image = imageValidation.error!;
            }
        } else {
            const imageValidation = validateRequired(formData.image, 'imagen');
            if (!imageValidation.isValid) {
                errors.image = 'Debes seleccionar una imagen';
            }
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

                    {/* Método de carga de imagen */}
                    {!viewMode && (
                        <Box>
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
                                    value={formData.image}
                                    onChange={(e) => handleImageUrlChange(e.target.value)}
                                    required
                                    fullWidth
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    helperText={validationErrors.image || "Ingresa la URL completa de la imagen"}
                                    error={!!validationErrors.image}
                                    sx={validationErrors.image ? shakeAnimation : {}}
                                />
                            ) : (
                                <Box>
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<CloudUpload />}
                                        sx={{
                                            py: 2,
                                            borderColor: validationErrors.image ? 'error.main' : undefined,
                                            color: validationErrors.image ? 'error.main' : undefined
                                        }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Procesando imagen...' : 'Seleccionar Imagen'}
                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handleImageFileChange}
                                        />
                                    </Button>
                                    {validationErrors.image && (
                                        <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5, ml: 1.75 }}>
                                            Debes seleccionar una imagen
                                        </Box>
                                    )}
                                </Box>
                            )}

                            {/* Preview de la imagen */}
                            {imagePreview && (
                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <Box
                                        component="img"
                                        src={imagePreview}
                                        alt="Preview"
                                        sx={{
                                            maxWidth: '100%',
                                            maxHeight: 200,
                                            borderRadius: 2,
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    )}

                    {viewMode && formData.image && (
                        <Box sx={{ textAlign: 'center' }}>
                            <Box
                                component="img"
                                src={formData.image}
                                alt={formData.name}
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: 200,
                                    borderRadius: 2,
                                    objectFit: 'contain',
                                }}
                            />
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
