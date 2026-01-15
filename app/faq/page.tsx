"use client";

import { useState } from "react";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import classes from "./classes";
import { HomeGlobalStyles } from "@/app/(home)/HomeStyles";
import { hexToRgba } from "@/utils/style";
import { SOCIAL_NETWORKS } from "@/constants/social";
import StructuredData from "@/app/components/StructuredData";
import { createBreadcrumbSchema, createFAQPageSchema } from "@/constants/seo";
import { useAppSelector } from "@/state/redux/store";

interface FAQ {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const FAQPage = () => {
    const siteConfig = useAppSelector(state => state.auth.siteConfig);
    const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
    const [expanded, setExpanded] = useState<number | false>(false);

    // Usar WhatsApp de config (solo si está configurado)
    const whatsappNumber = siteConfig.socialMedia.whatsapp;

    const categories = ["Todas", "Pedidos", "Productos", "Envíos", "Cuidados"];

    const faqs: FAQ[] = [
        // Pedidos
        {
            id: 1,
            question: "¿Cómo puedo realizar un pedido?",
            answer: "Puedes realizar tu pedido directamente a través de WhatsApp haciendo clic en el botón 'Contactar por WhatsApp' o agregando productos al carrito en nuestra tienda online. Te responderemos a la brevedad para coordinar los detalles de tu compra.",
            category: "Pedidos"
        },
        {
            id: 2,
            question: "¿Aceptan pedidos personalizados?",
            answer: "¡Sí! Nos encanta crear piezas únicas según tus necesidades. Contáctanos por WhatsApp con tu idea y trabajaremos juntos para diseñar la pieza perfecta para ti. Ten en cuenta que los pedidos personalizados pueden tardar entre 2-4 semanas dependiendo de la complejidad.",
            category: "Pedidos"
        },
        {
            id: 3,
            question: "¿Cuál es el tiempo de producción?",
            answer: "Cada pieza es hecha a mano bajo pedido. El tiempo de producción es generalmente de 1-2 semanas para piezas estándar y 2-4 semanas para pedidos personalizados. Te confirmaremos el tiempo exacto al momento de realizar tu pedido.",
            category: "Pedidos"
        },
        {
            id: 4,
            question: "¿Puedo cancelar o modificar mi pedido?",
            answer: "Sí, puedes cancelar o modificar tu pedido siempre que no haya comenzado el proceso de producción. Contáctanos lo antes posible por WhatsApp para gestionar cualquier cambio en tu orden.",
            category: "Pedidos"
        },

        // Productos
        {
            id: 5,
            question: "¿Todas las piezas son únicas?",
            answer: "Sí, al ser cerámica artesanal hecha a mano, cada pieza tiene su propia personalidad. Pueden existir pequeñas variaciones en forma, color y acabado que las hacen únicas e irrepetibles. Estas 'imperfecciones' son parte del encanto de lo artesanal.",
            category: "Productos"
        },
        {
            id: 6,
            question: "¿Los productos son aptos para lavavajillas y microondas?",
            answer: "Sí, nuestras piezas están hechas con arcilla de alta temperatura y esmaltes certificados, por lo que son seguras para uso en lavavajillas y microondas. Sin embargo, recomendamos el lavado a mano para prolongar su vida útil y mantener su belleza original.",
            category: "Productos"
        },
        {
            id: 7,
            question: "¿Qué materiales utilizan?",
            answer: "Trabajamos con arcillas de gres de alta calidad y esmaltes cerámicos no tóxicos, aptos para contacto con alimentos. Todos nuestros materiales son seguros, sostenibles y provienen de proveedores certificados.",
            category: "Productos"
        },
        {
            id: 8,
            question: "¿Tienen stock disponible o todo es bajo pedido?",
            answer: "Tenemos algunas piezas en stock listas para envío inmediato, pero la mayoría de nuestros productos se elaboran bajo pedido para garantizar la frescura y calidad de cada pieza. Consúltanos disponibilidad por WhatsApp.",
            category: "Productos"
        },

        // Envíos
        {
            id: 9,
            question: "¿Realizan envíos a todo el país?",
            answer: "Sí, enviamos a toda Argentina. Trabajamos con correos confiables y embalamos cada pieza con extremo cuidado para que llegue en perfectas condiciones a tu hogar.",
            category: "Envíos"
        },
        {
            id: 10,
            question: "¿Cuánto cuesta el envío?",
            answer: "El costo de envío varía según el destino y el peso del paquete. Te cotizaremos el envío exacto al momento de confirmar tu pedido. Para compras superiores a $50.000, el envío es gratis dentro de Córdoba Capital.",
            category: "Envíos"
        },
        {
            id: 11,
            question: "¿Cuánto tarda en llegar mi pedido?",
            answer: "Una vez que la pieza está lista, el tiempo de envío depende de tu ubicación: 3-5 días hábiles para Córdoba Capital, 5-7 días para el interior de Córdoba y 7-10 días para otras provincias.",
            category: "Envíos"
        },
        {
            id: 12,
            question: "¿Puedo retirar mi pedido personalmente?",
            answer: "¡Por supuesto! Si estás en Córdoba, puedes coordinar con nosotros para retirar tu pedido en nuestro taller. Te enviaremos la dirección exacta y horarios disponibles por WhatsApp.",
            category: "Envíos"
        },

        // Cuidados
        {
            id: 13,
            question: "¿Cómo debo cuidar mis piezas de cerámica?",
            answer: "Aunque nuestras piezas son resistentes, recomendamos: lavar a mano con detergente suave, evitar cambios bruscos de temperatura, no usar esponjas abrasivas y secar bien después de lavar. Con estos cuidados, tus piezas durarán muchos años.",
            category: "Cuidados"
        },
        {
            id: 14,
            question: "¿Qué hago si mi pieza se rompe?",
            answer: "La cerámica es un material noble pero delicado. Si tu pieza sufre algún daño, puedes intentar repararla con pegamento especial para cerámica (resina epoxi). Aunque no recomendamos usar piezas reparadas para alimentos, pueden seguir siendo hermosos objetos decorativos.",
            category: "Cuidados"
        },
        {
            id: 15,
            question: "¿Las piezas cambian de color con el tiempo?",
            answer: "No, nuestros esmaltes son permanentes y no se decoloran con el uso ni el lavado. Sin embargo, como toda cerámica, pueden desarrollar pequeñas marcas de uso con el tiempo, lo que les da carácter y cuenta su historia.",
            category: "Cuidados"
        },
        {
            id: 16,
            question: "¿Son seguras para niños?",
            answer: "Sí, nuestras piezas son completamente seguras y no tóxicas. Sin embargo, al ser cerámica, pueden romperse si se caen. Para niños pequeños, recomendamos supervisión de adultos durante su uso.",
            category: "Cuidados"
        }
    ];

    const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const filteredFaqs = selectedCategory === "Todas"
        ? faqs
        : faqs.filter(faq => faq.category === selectedCategory);

    return (
        <>
            <StructuredData data={createBreadcrumbSchema([
                { name: "Inicio", url: "/" },
                { name: "FAQ", url: "/faq" }
            ])} />
            <StructuredData data={createFAQPageSchema(
                filteredFaqs.map(faq => ({
                    question: faq.question,
                    answer: faq.answer
                }))
            )} />
            <HomeGlobalStyles />
            <Box sx={classes.root}>
                {/* Hero Section */}
                <Box sx={classes.heroSection}>
                    <Container maxWidth="xl" sx={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={classes.heroContent}>
                            <Box sx={classes.heroBadge} className="fade-in">
                                <Typography sx={{ fontSize: { xs: '0.85rem', md: '1rem' }, fontWeight: 600 }}>
                                    💬 Estamos aquí para ayudarte
                                </Typography>
                            </Box>

                            <Typography
                                variant="h1"
                                sx={classes.heroTitle}
                                className="fade-in-up"
                            >
                                Preguntas Frecuentes
                            </Typography>

                            <Typography
                                sx={classes.heroSubtitle}
                                className="fade-in-up-delay-1"
                            >
                                Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros productos,
                                procesos y políticas.
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                <Container maxWidth="lg">
                    {/* Categories */}
                    <Box sx={classes.categoriesSection}>
                        <Typography variant="h2" sx={classes.sectionTitle} className="fade-in">
                            Explora por Categoría
                        </Typography>
                        <Typography sx={classes.sectionSubtitle} className="fade-in">
                            Filtra las preguntas según el tema que te interese
                        </Typography>

                        <Box sx={classes.categoriesGrid}>
                            {categories.map((category, index) => (
                                <Box
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    sx={{
                                        ...classes.categoryChip,
                                        ...(selectedCategory === category && classes.categoryChipActive)
                                    }}
                                    className="fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {category}
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    {/* FAQ Accordions */}
                    <Box sx={classes.faqSection}>
                        <Typography variant="h2" sx={classes.sectionTitle} className="fade-in">
                            {selectedCategory === "Todas" ? "Todas las Preguntas" : selectedCategory}
                        </Typography>
                        <Typography sx={classes.sectionSubtitle} className="fade-in">
                            {filteredFaqs.length} {filteredFaqs.length === 1 ? 'pregunta encontrada' : 'preguntas encontradas'}
                        </Typography>

                        <Box>
                            {filteredFaqs.map((faq, index) => (
                                <Accordion
                                    key={faq.id}
                                    expanded={expanded === faq.id}
                                    onChange={handleChange(faq.id)}
                                    sx={classes.accordion}
                                    className="fade-in-up"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: 'secondary.main', fontSize: '2rem' }} />}
                                        sx={classes.accordionSummary}
                                    >
                                        <Typography sx={classes.accordionQuestion}>
                                            {faq.question}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={classes.accordionDetails}>
                                        <Typography sx={classes.accordionAnswer}>
                                            {faq.answer}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Box>
                </Container>

                {/* CTA Section */}
                <Box sx={classes.ctaSection}>
                    <Container maxWidth="md">
                        <Typography variant="h2" sx={classes.ctaTitle} className="fade-in-up">
                            ¿No encontraste lo que buscabas?
                        </Typography>
                        <Typography sx={classes.ctaSubtitle} className="fade-in-up-delay-1">
                            Escríbenos por WhatsApp y con gusto responderemos todas tus consultas.
                            Estamos disponibles de lunes a viernes de 9 a 18hs.
                        </Typography>
                        {whatsappNumber && (
                            <Box className="fade-in-up-delay-2">
                                <Button
                                    component="a"
                                    href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="contained"
                                    size="large"
                                    startIcon={<WhatsAppIcon />}
                                    sx={{
                                        ...classes.ctaButton,
                                        backgroundColor: 'white',
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: hexToRgba('#fff', 0.9),
                                            transform: 'translateY(-3px) scale(1.02)',
                                            boxShadow: `0 10px 30px ${hexToRgba('#000', 0.3)}`,
                                        }
                                    }}
                                >
                                    Contactar por WhatsApp
                                </Button>
                            </Box>
                        )}
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default FAQPage;
