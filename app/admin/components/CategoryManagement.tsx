"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    TextField,
    InputAdornment,
    CircularProgress,
    Backdrop,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    AddOutlined,
    EditOutlined,
    DeleteOutlined,
    VisibilityOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { deleteCategory } from "@/state/redux/shop";
import { getCategoriesAsync } from "@/state/redux/shop/thunk";
import { Category } from "@/types/shop";
import CategoryForm from "./CategoryForm";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import classes from "./classes";

const CategoryManagement = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.shop.categories);
    const token = useAppSelector(state => state.auth.token);
    const categoriesStatus = useAppSelector(state => state.shop.status.getCategoriesAsync);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [viewMode, setViewMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });

    // Cargar categorías al montar el componente
    useEffect(() => {
        if (token && categories.length === 0) {
            dispatch(getCategoriesAsync());
        }
    }, [dispatch, token, categories.length]);

    const handleAdd = () => {
        setSelectedCategory(null);
        setViewMode(false);
        setOpenDialog(true);
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setViewMode(false);
        setOpenDialog(true);
    };

    const handleView = (category: Category) => {
        setSelectedCategory(category);
        setViewMode(true);
        setOpenDialog(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar esta categoría? Los productos que usen esta categoría podrían quedar sin categoría asignada.")) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/categories?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                dispatch(deleteCategory(id));
                setToast({
                    open: true,
                    message: 'Categoría eliminada exitosamente',
                    severity: 'success'
                });
            } else {
                const data = await response.json();
                setToast({
                    open: true,
                    message: data.error || 'Error al eliminar la categoría',
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

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedCategory(null);
        setViewMode(false);
    };

    // Filtrar categorías por búsqueda
    const filteredCategories = searchTerm
        ? categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : categories;

    return (
        <Box>
            <Box sx={classes.header}>
                <Typography variant="h5" sx={classes.sectionTitle}>
                    Gestión de Categorías
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddOutlined />}
                    onClick={handleAdd}
                    sx={classes.addButton}
                >
                    Agregar Categoría
                </Button>
            </Box>

            {/* Buscador */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    Mostrando {filteredCategories.length} de {categories.length} categorías
                </Typography>
            </Paper>

            <TableContainer component={Paper} sx={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={classes.tableHeader}>Imagen</TableCell>
                            <TableCell sx={classes.tableHeader}>Nombre</TableCell>
                            <TableCell sx={classes.tableHeader}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCategories.map((category) => (
                            <TableRow key={category.id} hover>
                                <TableCell>
                                    <Box
                                        component="img"
                                        src={category.image}
                                        alt={category.name}
                                        sx={classes.productImage}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography sx={classes.productName}>
                                        {category.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={classes.actionButtons}>
                                        <IconButton
                                            size="small"
                                            color="info"
                                            onClick={() => handleView(category)}
                                        >
                                            <VisibilityOutlined />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => handleEdit(category)}
                                        >
                                            <EditOutlined />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(category.id)}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
            >
                <CategoryForm
                    category={selectedCategory}
                    onClose={handleCloseDialog}
                    viewMode={viewMode}
                />
            </Dialog>

            {/* Loading Overlay para carga de categorías */}
            <LoadingOverlay
                open={categoriesStatus?.loading || false}
                message="Cargando categorías..."
            />

            {/* Loading Backdrop para eliminar */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

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

export default CategoryManagement;
