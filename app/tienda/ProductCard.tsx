"use client";

import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Product } from "@/types/shop";
import ImageCarousel from "@/app/components/ImageCarousel";
import classes from "./classes";
import "./animations.css";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    animationDelay?: number;
}

const ProductCard = ({ product, onAddToCart, animationDelay = 0 }: ProductCardProps) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const descriptionLength = product.description.length;
    const shouldShowReadMore = descriptionLength > 80;

    return (
        <Box
            sx={classes.productCard}
            className="fade-in-up tienda-product-card-hover"
            style={{ animationDelay: `${animationDelay}s` }}
        >
            {/* Image Container */}
            <Box sx={{ position: 'relative' }}>
                <ImageCarousel
                    images={product.images && product.images.length > 0 ? product.images : [product.image].filter(Boolean)}
                    alt={product.name}
                />

                {/* Featured Badge */}
                {product.featured && (
                    <Box sx={{
                        ...classes.productBadge,
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        zIndex: 3,
                    }}>
                        Destacado
                    </Box>
                )}
            </Box>

            {/* Product Info */}
            <Box sx={classes.productInfo}>
                <Typography sx={classes.productName}>
                    {product.name}
                </Typography>

                <Box sx={classes.productDescription}>
                    <Typography
                        component="span"
                        sx={showFullDescription ? {} : classes.productDescriptionText}
                    >
                        {product.description}
                    </Typography>
                    {shouldShowReadMore && (
                        <Typography
                            component="span"
                            sx={classes.readMoreButton}
                            onClick={() => setShowFullDescription(!showFullDescription)}
                        >
                            {showFullDescription ? ' Ver menos' : '... Ver más'}
                        </Typography>
                    )}
                </Box>

                <Typography sx={classes.productPrice}>
                    ${new Intl.NumberFormat("es-AR").format(product.price)}
                </Typography>

                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    sx={classes.addToCartButton}
                    onClick={() => onAddToCart(product)}
                >
                    Agregar al Carrito
                </Button>
            </Box>
        </Box>
    );
};

export default ProductCard;
