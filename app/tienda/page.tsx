"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Container, Typography, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel, CircularProgress, Pagination } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import classes from "./classes";
import { HomeGlobalStyles } from "@/app/(home)/HomeStyles";
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { addToCart } from "@/state/redux/shop";
import { getProductsAsync, getCategoriesAsync } from "@/state/redux/shop/thunk";
import { Product } from "@/types/shop";
import ProductCard from "./ProductCard";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import StructuredData from "@/app/components/StructuredData";
import { createBreadcrumbSchema, createProductSchema } from "@/constants/seo";

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

const ITEMS_PER_PAGE = 12;

const TiendaContent = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.shop.products);
    const categories = useAppSelector(state => state.shop.categories);
    const productsStatus = useAppSelector(state => state.shop.status.getProductsAsync);
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [sortBy, setSortBy] = useState<SortOption>('featured');
    const [currentPage, setCurrentPage] = useState(1);

    // Cargar productos y categorías al montar el componente
    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProductsAsync());
        }
        if (categories.length === 0) {
            dispatch(getCategoriesAsync());
        }
    }, [dispatch, products.length, categories.length]);

    // Apply category filter from URL on mount
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, sortBy]);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // Filter by search query
        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== "Todas") {
            result = result.filter(product => product.category === selectedCategory);
        }

        // Sort
        switch (sortBy) {
            case 'featured':
                result.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return 0;
                });
                break;
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return result;
    }, [products, searchQuery, selectedCategory, sortBy]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, endIndex);
    }, [filteredAndSortedProducts, currentPage]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        // Scroll to top of products section
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    };

    return (
        <>
            <StructuredData data={createBreadcrumbSchema([
                { name: "Inicio", url: "/" },
                { name: "Tienda", url: "/tienda" }
            ])} />
            {paginatedProducts.map(product => (
                <StructuredData key={product.id} data={createProductSchema(product)} />
            ))}
            <HomeGlobalStyles />
            <LoadingOverlay
                open={productsStatus?.loading || false}
                message="Cargando productos de nuestra tienda..."
            />
            <Box sx={classes.root}>
                {/* Hero Section */}
                <Box sx={classes.heroSection}>
                    <Container maxWidth="xl" sx={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={classes.heroContent}>
                            <Box sx={classes.heroBadge} className="fade-in">
                                <Typography sx={{ fontSize: { xs: '0.85rem', md: '1rem' }, fontWeight: 600 }}>
                                    ✨ Cerámica Artesanal
                                </Typography>
                            </Box>

                            <Typography
                                variant="h1"
                                sx={classes.heroTitle}
                                className="fade-in-up"
                            >
                                Nuestra Tienda
                            </Typography>

                            <Typography
                                sx={classes.heroSubtitle}
                                className="fade-in-up-delay-1"
                            >
                                Descubre piezas únicas, hechas a mano con amor y dedicación.
                                Cada producto cuenta su propia historia.
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                <Container maxWidth="xl">
                    {/* Filters Section */}
                    <Box sx={classes.filtersSection}>
                        {/* Search */}
                        <TextField
                            fullWidth
                            placeholder="Buscar productos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                },
                                mb: 3
                            }}
                        />

                        {/* Filters Row */}
                        <Box sx={classes.filtersRow}>
                            {/* Categories Filter */}
                            <FormControl sx={classes.categorySelect} size="small">
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    value={selectedCategory}
                                    label="Categoría"
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    sx={{ borderRadius: 3 }}
                                >
                                    <MenuItem value="Todas">Todas las categorías</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.name}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Sort Filter */}
                            <FormControl sx={classes.sortSelect} size="small">
                                <InputLabel>Ordenar por</InputLabel>
                                <Select
                                    value={sortBy}
                                    label="Ordenar por"
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    sx={{ borderRadius: 3 }}
                                >
                                    <MenuItem value="featured">Destacados</MenuItem>
                                    <MenuItem value="price-asc">Precio: Menor a Mayor</MenuItem>
                                    <MenuItem value="price-desc">Precio: Mayor a Menor</MenuItem>
                                    <MenuItem value="name">Nombre A-Z</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* Products Section */}
                    <Box sx={classes.productsSection}>
                        {/* Results Header */}
                        <Box sx={classes.resultsHeader}>
                            <Typography sx={classes.resultsCount}>
                                {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                            </Typography>
                        </Box>

                        {/* Products Grid */}
                        {filteredAndSortedProducts.length > 0 ? (
                            <>
                                <Box sx={classes.productsGrid}>
                                    {paginatedProducts.map((product, index) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onAddToCart={handleAddToCart}
                                            animationDelay={index * 0.05}
                                        />
                                    ))}
                                </Box>

                                {/* Pagination */}
                                <Box sx={classes.paginationContainer}>
                                    <Pagination
                                        count={totalPages || 1}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        color="secondary"
                                        size="large"
                                        showFirstButton
                                        showLastButton
                                        sx={classes.pagination}
                                    />
                                </Box>
                            </>
                        ) : !productsStatus?.loading ? (
                            // Empty State (solo mostrar si NO está cargando)
                            <Box sx={classes.emptyState}>
                                <StorefrontIcon sx={classes.emptyStateIcon} />
                                <Typography sx={classes.emptyStateTitle}>
                                    No se encontraron productos
                                </Typography>
                                <Typography sx={classes.emptyStateText}>
                                    Intenta ajustar los filtros o la búsqueda para encontrar lo que buscas.
                                </Typography>
                            </Box>
                        ) : null}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

const TiendaPage = () => {
    return (
        <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        }>
            <TiendaContent />
        </Suspense>
    );
};

export default TiendaPage;
