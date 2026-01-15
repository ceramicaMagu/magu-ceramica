"use client";

import { useEffect, useMemo } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import classes from "./classes";
import { ROUTES } from "@/constants/routes";
import { hexToRgba } from "@/utils/style";
import { HomeGlobalStyles } from "./HomeStyles";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandmadeIcon from '@mui/icons-material/Handyman';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NatureIcon from '@mui/icons-material/Nature';
import { useAppDispatch, useAppSelector } from "@/state/redux/store";
import { getCategoriesAsync, getProductsAsync } from "@/state/redux/shop/thunk";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import StructuredData from "@/app/components/StructuredData";
import { createOrganizationSchema, createWebSiteSchema, createBreadcrumbSchema } from "@/constants/seo";
import "./animations.css";
import ImgHistoria from '@/public/historia.webp'

const Home = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.shop.categories);
    const products = useAppSelector(state => state.shop.products);
    const categoriesStatus = useAppSelector(state => state.shop.status.getCategoriesAsync);
    const productsStatus = useAppSelector(state => state.shop.status.getProductsAsync);

    // Cargar categorías y productos al montar
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategoriesAsync());
        }
        if (products.length === 0) {
            dispatch(getProductsAsync());
        }
    }, [dispatch, categories.length, products.length]);

    // Contar productos por categoría
    const categoriesWithCount = useMemo(() => {
        return categories.map(category => ({
            ...category,
            count: products.filter(p => p.category === category.name).length
        }));
    }, [categories, products]);

    const processSteps = [
        {
            number: "01",
            title: "Diseño y Planificación",
            description: "Cada pieza comienza con una idea, un boceto que captura la esencia de lo que queremos crear. Diseñamos pensando en funcionalidad y belleza."
        },
        {
            number: "02",
            title: "Moldeado Artesanal",
            description: "Con nuestras manos transformamos la arcilla en formas únicas. Cada movimiento cuenta, cada detalle importa en este proceso ancestral."
        },
        {
            number: "03",
            title: "Cocción y Acabado",
            description: "El horno tradicional le da vida a cada pieza, mientras que el esmaltado final añade color y personalidad. Cada paso es realizado con dedicación."
        }
    ];

    const testimonials = [
        {
            text: "Las piezas de Magu Cerámica han transformado mi hogar. Cada una tiene su propia historia y personalidad única. Son realmente especiales.",
            author: "María González"
        },
        {
            text: "La calidad artesanal se nota en cada detalle. Compré varios productos y todos superaron mis expectativas. Definitivamente volveré a comprar.",
            author: "Carlos Martínez"
        },
        {
            text: "Lo que más me encanta es saber que cada pieza es única. No hay dos iguales, y eso las hace aún más especiales. Son obras de arte funcionales.",
            author: "Ana Rodríguez"
        }
    ];

    const isLoading = categoriesStatus?.loading || productsStatus?.loading;

    return (
        <>
            <StructuredData data={createOrganizationSchema()} />
            <StructuredData data={createWebSiteSchema()} />
            <StructuredData data={createBreadcrumbSchema([
                { name: "Inicio", url: "/" }
            ])} />
            <HomeGlobalStyles />
            <LoadingOverlay
                open={isLoading || false}
                message="Cargando contenido..."
            />
            <Box>
                {/* Hero Section */}
                <Box sx={classes.heroSection}>
                    <Container maxWidth="xl" sx={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={classes.heroContent}>
                            <Box sx={classes.heroBadge} className="fade-in">
                                <Typography sx={{ fontSize: { xs: '0.85rem', md: '1rem' }, fontWeight: 600 }}>
                                    ✨ Arte hecho a mano
                                </Typography>
                            </Box>

                            <Typography
                                variant="h1"
                                sx={classes.heroTitle}
                                className="fade-in-up"
                            >
                                Magu Cerámica
                            </Typography>

                            <Typography
                                variant="h5"
                                component="p"
                                sx={classes.heroSubtitle}
                                className="fade-in-up-delay-1"
                            >
                                Descubre la belleza de la cerámica artesanal. Cada pieza es única,
                                moldeada con pasión para transformar tus momentos cotidianos en experiencias extraordinarias.
                            </Typography>

                            <Box sx={classes.heroButtons} className="fade-in-up-delay-2">
                                <Button
                                    component={Link}
                                    href={ROUTES.find(r => r.label === "Tienda")?.href || "/tienda"}
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    sx={classes.heroButton}
                                >
                                    Explorar Colección
                                </Button>
                                <Button
                                    component={Link}
                                    href={ROUTES.find(r => r.label === "Nosotros")?.href || "/nosotros"}
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        ...classes.heroButton,
                                        borderColor: 'white',
                                        borderWidth: 2,
                                        color: 'white',
                                        backgroundColor: 'transparent',
                                        '&:hover': {
                                            borderColor: 'white',
                                            borderWidth: 2,
                                            backgroundColor: hexToRgba('#fff', 0.15),
                                            transform: 'translateY(-3px) scale(1.02)',
                                            boxShadow: `0 10px 30px ${hexToRgba('#000', 0.35)}`,
                                        }
                                    }}
                                >
                                    Nuestra Historia
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* Categorías - Solo mostrar si hay categorías */}
                {categoriesWithCount.length > 0 && (
                    <Box sx={classes.section}>
                        <Container maxWidth="xl">
                            <Typography variant="h2" sx={classes.sectionTitle} className="fade-in">
                                Explora por Categorías
                            </Typography>
                            <Typography sx={classes.sectionSubtitle} className="fade-in">
                                Encuentra lo que buscas navegando por nuestras colecciones artesanales
                            </Typography>
                            <Box sx={classes.categoriesGrid}>
                                {categoriesWithCount.map((category, index) => (
                                    <Box
                                        key={category.id}
                                        component={Link}
                                        href={`${ROUTES.find(r => r.label === "Tienda")?.href || "/tienda"}?category=${category.name}`}
                                        sx={classes.categoryCard}
                                        className="fade-in-up home-product-card-hover"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <Box className="home-image-zoom-container" sx={classes.categoryImageContainer}>
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="home-image-zoom"
                                                style={{
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Box>
                                        <Box sx={classes.categoryInfo}>
                                            <Typography sx={classes.categoryName}>
                                                {category.name}
                                            </Typography>
                                            <Typography sx={classes.categoryCount}>
                                                {category.count} {category.count === 1 ? 'producto' : 'productos'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Container>
                    </Box>
                )}

                {/* Proceso Artesanal */}
                <Box sx={{ ...classes.section, ...classes.processSection }}>
                    <Container maxWidth="lg">
                        <Typography variant="h2" sx={classes.sectionTitle} className="fade-in">
                            Nuestro Proceso Artesanal
                        </Typography>
                        <Typography sx={classes.sectionSubtitle} className="fade-in">
                            Conoce cómo transformamos la arcilla en piezas únicas llenas de historia y pasión
                        </Typography>
                        <Box sx={classes.processSteps}>
                            {processSteps.map((step, index) => (
                                <Box key={step.number} sx={classes.processStep} className="fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                                    <Typography sx={classes.processStepNumber}>
                                        {step.number}
                                    </Typography>
                                    <Typography variant="h5" sx={classes.processStepTitle}>
                                        {step.title}
                                    </Typography>
                                    <Typography sx={classes.processStepDescription}>
                                        {step.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Container>
                </Box>

                {/* Sobre Nosotros */}
                <Box sx={{ ...classes.section, ...classes.aboutSection }}>
                    <Container maxWidth="lg">
                        <Typography variant="h2" sx={classes.sectionTitle} className="fade-in">
                            Nuestra Historia
                        </Typography>
                        <Box sx={classes.aboutContent}>
                            <Box className="slide-in-left">
                                <Image
                                    src={ImgHistoria}
                                    alt="Proceso artesanal"
                                    width={600}
                                    height={500}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '12px',
                                    }}
                                />
                            </Box>
                            <Box className="slide-in-right">
                                <Typography sx={classes.aboutText}>
                                    En Magu Cerámica, creemos que cada pieza cuenta una historia. Nuestro proceso
                                    artesanal combina técnicas tradicionales con un toque contemporáneo, dando vida
                                    a objetos únicos que acompañan tus momentos especiales.
                                </Typography>
                                <Typography sx={classes.aboutText}>
                                    Cada pieza es moldeada a mano con dedicación y cuidado, asegurando que no haya
                                    dos iguales. Esta singularidad es lo que hace especial cada creación,
                                    transformando lo ordinario en extraordinario.
                                </Typography>
                                <Typography sx={classes.aboutText}>
                                    Trabajamos con materiales naturales y técnicas que han pasado de generación en
                                    generación, fusionando la sabiduría ancestral con visiones modernas para crear
                                    piezas atemporales.
                                </Typography>
                                <Button
                                    component={Link}
                                    href={ROUTES.find(r => r.label === "Nosotros")?.href || "/nosotros"}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ mt: 2 }}
                                >
                                    Conoce Nuestra Historia
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* Características */}
                <Box sx={{ ...classes.section, py: { xs: 8, md: 12 } }}>
                    <Container maxWidth="lg">
                        <Typography variant="h2" sx={classes.sectionTitle}>
                            ¿Por Qué Elegirnos?
                        </Typography>

                        <Typography sx={{ ...classes.sectionSubtitle, mb: 6 }}>
                            Porque cada pieza que ves fue creada a mano, con intención, tiempo y cuidado real.
                        </Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
                                gap: 4,
                            }}
                        >
                            <Box sx={classes.featureCard}>
                                <HandmadeIcon sx={classes.featureIcon} />
                                <Typography sx={classes.featureTitle}>
                                    Hecho a mano
                                </Typography>
                                <Typography sx={classes.featureDescription}>
                                    Cada pieza se crea una a una, sin producción industrial ni moldes en serie.
                                </Typography>
                            </Box>

                            <Box sx={classes.featureCard}>
                                <AutoAwesomeIcon sx={classes.featureIcon} />
                                <Typography sx={classes.featureTitle}>
                                    Piezas irrepetibles
                                </Typography>
                                <Typography sx={classes.featureDescription}>
                                    Las variaciones hacen que tu pieza sea única y diferente a cualquier otra.
                                </Typography>
                            </Box>

                            <Box sx={classes.featureCard}>
                                <NatureIcon sx={classes.featureIcon} />
                                <Typography sx={classes.featureTitle}>
                                    Materiales nobles
                                </Typography>
                                <Typography sx={classes.featureDescription}>
                                    Trabajamos con arcillas y esmaltes naturales, cuidando cada proceso.
                                </Typography>
                            </Box>

                            <Box sx={classes.featureCard}>
                                <FavoriteIcon sx={classes.featureIcon} />
                                <Typography sx={classes.featureTitle}>
                                    Diseño con sentido
                                </Typography>
                                <Typography sx={classes.featureDescription}>
                                    Cerámica funcional pensada para acompañar momentos reales de tu día a día.
                                </Typography>
                            </Box>
                        </Box>

                        {/* Refuerzo + CTA */}
                        <Box sx={{ textAlign: "center", mt: 8 }}>
                            <Typography sx={{ mb: 3, fontWeight: 500 }}>
                                Más de personas ya eligieron piezas Magu para su hogar.
                            </Typography>

                            <Button
                                component={Link}
                                href="/tienda"
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<LocalMallIcon />}
                            >
                                Ver la Colección
                            </Button>
                        </Box>
                    </Container>
                </Box>

                {/* Testimonios */}
                <Box sx={{ ...classes.section, ...classes.testimonialsSection }}>
                    <Container maxWidth="lg">
                        <Typography variant="h2" sx={classes.sectionTitle} className="fade-in">
                            Lo Que Dicen Nuestros Clientes
                        </Typography>
                        <Typography sx={classes.sectionSubtitle} className="fade-in">
                            Historias reales de personas que han encontrado su pieza perfecta
                        </Typography>
                        <Box sx={classes.testimonialsGrid}>
                            {testimonials.map((testimonial, index) => (
                                <Box key={index} sx={classes.testimonialCard} className="fade-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                                    <Typography sx={classes.testimonialText}>
                                        {testimonial.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Container>
                </Box>

                {/* CTA Section */}
                <Box sx={{ ...classes.section, ...classes.ctaSection, mb: 7 }}>
                    <Container maxWidth="md">
                        <Typography variant="h2" sx={classes.ctaTitle} className="fade-in-up">
                            ¿Listo para Encontrar tu Pieza Perfecta?
                        </Typography>
                        <Typography sx={classes.ctaSubtitle} className="fade-in-up-delay-1">
                            Explora nuestra colección completa y descubre piezas únicas que transformarán
                            tus espacios y llenarán tu hogar de magia.
                        </Typography>
                        <Box className="fade-in-up-delay-2">
                            <Button
                                component={Link}
                                href={ROUTES.find(r => r.label === "Tienda")?.href || "/tienda"}
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<LocalMallIcon />}
                                sx={{
                                    ...classes.heroButton,
                                    backgroundColor: 'white',
                                    color: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: hexToRgba('#fff', 0.9),
                                    }
                                }}
                            >
                                Ver Tienda Completa
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default Home;