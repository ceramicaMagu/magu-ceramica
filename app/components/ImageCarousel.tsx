"use client";

import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';
import { hexToRgba } from '@/utils/style';

interface ImageCarouselProps {
    images: string[];
    alt: string;
}

const ImageCarousel = ({ images, alt }: ImageCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Si no hay imágenes, no mostrar nada
    if (!images || images.length === 0) {
        return null;
    }

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Si solo hay una imagen, mostrarla sin controles
    if (images.length === 1) {
        return (
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '100%', // Aspect ratio 1:1
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={images[0]}
                    alt={alt}
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                    priority
                />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%', // Aspect ratio 1:1
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            {/* Imagen actual */}
            <Image
                src={images[currentIndex]}
                alt={`${alt} - Imagen ${currentIndex + 1}`}
                fill
                style={{
                    objectFit: 'cover',
                }}
                priority={currentIndex === 0}
            />

            {/* Botón anterior */}
            <IconButton
                onClick={goToPrevious}
                sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#fff',
                    color: '#333',
                    width: { xs: 32, sm: 36 },
                    height: { xs: 32, sm: 36 },
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        color: '#fff',
                    },
                    transition: 'all 0.2s ease',
                    zIndex: 2,
                }}
                size="small"
            >
                <ChevronLeftIcon fontSize="small" />
            </IconButton>

            {/* Botón siguiente */}
            <IconButton
                onClick={goToNext}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#fff',
                    color: '#333',
                    width: { xs: 32, sm: 36 },
                    height: { xs: 32, sm: 36 },
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        color: '#fff',
                    },
                    transition: 'all 0.2s ease',
                    zIndex: 2,
                }}
                size="small"
            >
                <ChevronRightIcon fontSize="small" />
            </IconButton>

            {/* Indicadores (dots) */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 0.75,
                    backgroundColor: hexToRgba('#000', 0.35),
                    borderRadius: 3,
                    px: 1.5,
                    py: 0.75,
                    zIndex: 2,
                }}
            >
                {images.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        sx={{
                            width: currentIndex === index ? 20 : 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: currentIndex === index
                                ? 'primary.main'
                                : hexToRgba('#ffffff', 0.6),
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                backgroundColor: 'primary.light',
                            }
                        }}
                    />
                ))}
            </Box>

            {/* Contador de imágenes */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    backgroundColor: hexToRgba('#000', 0.6),
                    color: '#fff',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    zIndex: 2,
                }}
            >
                {currentIndex + 1} / {images.length}
            </Box>
        </Box>
    );
};

export default ImageCarousel;
