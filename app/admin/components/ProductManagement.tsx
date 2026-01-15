"use client";

import { useState, useMemo, useEffect } from "react";
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
    Chip,
    Dialog,
    TextField,
    MenuItem,
    InputAdornment,
    CircularProgress,
    Backdrop,
    Snackbar,
    Alert,
    Pagination,
} from "@mui/material";
import {
    AddOutlined,
    EditOutlined,
    DeleteOutlined,
    VisibilityOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { deleteProduct } from "@/state/redux/shop";
import { getProductsAsync, getCategoriesAsync } from "@/state/redux/shop/thunk";
import { Product } from "@/types/shop";
import ProductForm from "./ProductForm";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import classes from "./classes";

const ITEMS_PER_PAGE = 10;

const ProductManagement = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.shop.products);
    const categories = useAppSelector(state => state.shop.categories);
    const token = useAppSelector(state => state.auth.token);
    const productsStatus = useAppSelector(state => state.shop.status.getProductsAsync);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [viewMode, setViewMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("Todas");
    const [featuredFilter, setFeaturedFilter] = useState("Todos");
    const [sortBy, setSortBy] = useState("nombre-asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });

    // Cargar productos y categorías al montar el componente
    useEffect(() => {
        if (token) {
            if (products.length === 0) {
                dispatch(getProductsAsync());
            }
            if (categories.length === 0) {
                dispatch(getCategoriesAsync());
            }
        }
    }, [dispatch, token, products.length, categories.length]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter, featuredFilter, sortBy]);

    const handleAdd = () => {
        setSelectedProduct(null);
        setViewMode(false);
        setOpenDialog(true);
    };

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
        setViewMode(false);
        setOpenDialog(true);
    };

    const handleView = (product: Product) => {
        setSelectedProduct(product);
        setViewMode(true);
        setOpenDialog(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/products?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                dispatch(deleteProduct(id));
                setToast({
                    open: true,
                    message: 'Producto eliminado exitosamente',
                    severity: 'success'
                });
            } else {
                const data = await response.json();
                setToast({
                    open: true,
                    message: data.error || 'Error al eliminar el producto',
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
        setSelectedProduct(null);
        setViewMode(false);
    };

    // Filtrar y ordenar productos
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Filtro de búsqueda
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(lowerSearch) ||
                    p.description.toLowerCase().includes(lowerSearch) ||
                    p.category.toLowerCase().includes(lowerSearch)
            );
        }

        // Filtro de categoría
        if (categoryFilter !== "Todas") {
            filtered = filtered.filter((p) => p.category === categoryFilter);
        }

        // Filtro de destacados
        if (featuredFilter === "Destacados") {
            filtered = filtered.filter((p) => p.featured === true);
        }

        // Ordenamiento
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "nombre-asc":
                    return a.name.localeCompare(b.name);
                case "nombre-desc":
                    return b.name.localeCompare(a.name);
                case "precio-asc":
                    return a.price - b.price;
                case "precio-desc":
                    return b.price - a.price;
                case "id-asc":
                    return a.id - b.id;
                case "id-desc":
                    return b.id - a.id;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [products, searchTerm, categoryFilter, featuredFilter, sortBy]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, endIndex);
    }, [filteredAndSortedProducts, currentPage]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <Box>
            <Box sx={classes.header}>
                <Typography variant="h5" sx={classes.sectionTitle}>
                    Gestión de Productos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddOutlined />}
                    onClick={handleAdd}
                    sx={classes.addButton}
                >
                    Agregar Producto
                </Button>
            </Box>

            {/* Filtros y Buscador */}
            <Paper sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }, gap: 2 }}>
                    {/* Buscador */}
                    <TextField
                        placeholder="Buscar por nombre, descripción o categoría..."
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

                    {/* Filtro de Categoría */}
                    <TextField
                        select
                        label="Categoría"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        size="small"
                        fullWidth
                    >
                        <MenuItem value="Todas">Todas</MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.name}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Filtro de Destacados */}
                    <TextField
                        select
                        label="Estado"
                        value={featuredFilter}
                        onChange={(e) => setFeaturedFilter(e.target.value)}
                        size="small"
                        fullWidth
                    >
                        <MenuItem value="Todos">Todos</MenuItem>
                        <MenuItem value="Destacados">Destacados</MenuItem>
                    </TextField>

                    {/* Ordenamiento */}
                    <TextField
                        select
                        label="Ordenar por"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        size="small"
                        fullWidth
                    >
                        <MenuItem value="nombre-asc">Nombre A-Z</MenuItem>
                        <MenuItem value="nombre-desc">Nombre Z-A</MenuItem>
                        <MenuItem value="precio-asc">Precio: Menor a Mayor</MenuItem>
                        <MenuItem value="precio-desc">Precio: Mayor a Menor</MenuItem>
                        <MenuItem value="id-asc">ID Ascendente</MenuItem>
                        <MenuItem value="id-desc">ID Descendente</MenuItem>
                    </TextField>
                </Box>

                {/* Contador de resultados */}
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                    Mostrando {paginatedProducts.length} de {filteredAndSortedProducts.length} productos {filteredAndSortedProducts.length !== products.length && `(${products.length} en total)`}
                </Typography>
            </Paper>

            <TableContainer component={Paper} sx={classes.tableContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={classes.tableHeader}>Imagen</TableCell>
                            <TableCell sx={classes.tableHeader}>Nombre</TableCell>
                            <TableCell sx={classes.tableHeader}>Categoría</TableCell>
                            <TableCell sx={classes.tableHeader}>Precio</TableCell>
                            <TableCell sx={classes.tableHeader}>Estado</TableCell>
                            <TableCell sx={classes.tableHeader}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedProducts.map((product) => (
                            <TableRow key={product.id} hover>
                                <TableCell>
                                    <Box
                                        component="img"
                                        src={product.image}
                                        alt={product.name}
                                        sx={classes.productImage}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography sx={classes.productName}>
                                        {product.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.category}
                                        size="small"
                                        sx={classes.categoryChip}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography sx={classes.price}>
                                        ${new Intl.NumberFormat("es-AR").format(product.price)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {product.featured && (
                                        <Chip
                                            label="Destacado"
                                            size="small"
                                            color="secondary"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Box sx={classes.actionButtons}>
                                        <IconButton
                                            size="small"
                                            color="info"
                                            onClick={() => handleView(product)}
                                        >
                                            <VisibilityOutlined />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => handleEdit(product)}
                                        >
                                            <EditOutlined />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleDelete(product.id)}
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

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                <Pagination
                    count={totalPages || 1}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="secondary"
                    size="large"
                    showFirstButton
                    showLastButton
                />
            </Box>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
            >
                <ProductForm
                    product={selectedProduct}
                    onClose={handleCloseDialog}
                    viewMode={viewMode}
                />
            </Dialog>

            {/* Loading Overlay para carga de productos */}
            <LoadingOverlay
                open={productsStatus?.loading || false}
                message="Cargando productos..."
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

export default ProductManagement;
