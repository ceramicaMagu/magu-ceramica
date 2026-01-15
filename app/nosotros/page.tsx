"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import classes from "./classes";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandmadeIcon from '@mui/icons-material/Handyman';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { ROUTES } from "@/constants/routes";
import { hexToRgba } from "@/utils/style";
import { HomeGlobalStyles } from "@/app/(home)/HomeStyles";
import StructuredData from "@/app/components/StructuredData";
import { createBreadcrumbSchema, createOrganizationSchema } from "@/constants/seo";
import ImgTaller from '@/public/taller.webp'
import ImgMagu from '@/public/magu.webp'

const AboutPage = () => {
    const values = [
        {
            icon: <FavoriteIcon sx={classes.valueIcon} />,
            title: "Slow Living",
            description: "Creo en bajar la velocidad y disfrutar de los rituales cotidianos. Mis piezas son una invitación a estar presente en el momento."
        },
        {
            icon: <HandmadeIcon sx={classes.valueIcon} />,
            title: "Hecho a Mano",
            description: "Sin moldes industriales. Cada pieza pasa por mis manos múltiples veces: amasado, torneado, retorneado, esmaltado y horneado."
        },
        {
            icon: <LocalFloristIcon sx={classes.valueIcon} />,
            title: "Sostenibilidad",
            description: "Reutilizo los restos de arcilla, cuido el agua y uso embalajes libres de plástico siempre que es posible."
        }
    ];

    const stats = [
        { number: "+1.5k", label: "Piezas Creadas" },
        { number: "100%", label: "Amor Artesanal" },
        { number: "+5", label: "Años de Experiencia" },
        { number: "∞", label: "Pasión y Dedicación" }
    ];

    return (
        <>
            <StructuredData data={createBreadcrumbSchema([
                { name: "Inicio", url: "/" },
                { name: "Nosotros", url: "/nosotros" }
            ])} />
            <StructuredData data={createOrganizationSchema()} />
            <HomeGlobalStyles />
            <Box sx={classes.root}>
                {/* Hero Section */}
                <Box sx={classes.heroSection}>
                    <Container maxWidth="xl" sx={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box sx={classes.heroContent}>
                            <Box sx={classes.heroBadge} className="fade-in">
                                <Typography sx={{ fontSize: { xs: '0.85rem', md: '1rem' }, fontWeight: 600 }}>
                                    ✨ Nuestra Historia
                                </Typography>
                            </Box>

                            <Typography
                                variant="h1"
                                sx={classes.heroTitle}
                                className="fade-in-up"
                            >
                                Nuestra Esencia
                            </Typography>

                            <Typography
                                sx={classes.heroSubtitle}
                                className="fade-in-up-delay-1"
                            >
                                Magu Cerámica nace del deseo de reconectar con lo tangible, de crear objetos
                                que nos inviten a pausar y apreciar la belleza de lo imperfecto.
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                <Container maxWidth="lg">
                    {/* La Historia / Bio */}
                    <Box sx={classes.section}>
                        <Box sx={classes.bioContainer}>
                            <Box sx={classes.bioImageContainer} className="fade-in">
                                <Image
                                    src={ImgMagu}
                                    alt="Magu trabajando en el taller"
                                    fill
                                    style={{
                                        objectFit: 'cover',
                                        objectPosition: 'center top',
                                    }}
                                    priority
                                />
                            </Box>
                            <Box sx={classes.bioContent} className="fade-in-up-delay-1">
                                <Typography variant="h2" sx={classes.sectionTitle}>
                                    Hola, soy Cintia
                                </Typography>
                                <Typography sx={classes.paragraph}>
                                    Mi viaje con la cerámica comenzó hace más de 5 años como un escape del ritmo
                                    frenético de la ciudad. Lo que empezó como un taller de fin de semana se
                                    transformó rápidamente en mi pasión y mi forma de vida.
                                </Typography>
                                <Typography sx={classes.paragraph}>
                                    Encontré en la arcilla un lenguaje silencioso pero potente. Me enseñó paciencia,
                                    me enseñó a soltar el control y a aceptar que, a veces, las grietas son por donde
                                    entra la luz.
                                </Typography>

                                <Box sx={classes.highlightBox}>
                                    <Typography sx={classes.highlightText}>
                                        {`"No busco la perfección industrial. Busco la huella humana, el rastro de los dedos que moldearon la pieza, la historia que queda grabada en el barro."`}
                                    </Typography>
                                </Box>

                                <Typography sx={classes.paragraph}>
                                    Hoy, desde mi pequeño taller, creo piezas funcionales y decorativas pensadas para
                                    ser usadas, no solo admiradas. Quiero que mis tazas sean tu compañía en el café de
                                    la mañana y que mis platos sean testigos de tus mejores cenas.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Valores */}
                    <Box sx={classes.section}>
                        <Typography variant="h2" sx={classes.sectionTitleCentered} className="fade-in">
                            Lo Que Me Mueve
                        </Typography>
                        <Typography sx={classes.sectionSubtitle} className="fade-in">
                            Tres pilares fundamentales que guían cada pieza que creo
                        </Typography>
                        <Box sx={classes.valuesGrid}>
                            {values.map((value, index) => (
                                <Box
                                    key={index}
                                    sx={classes.valueCard}
                                    className="fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {value.icon}
                                    <Typography sx={classes.valueTitle}>{value.title}</Typography>
                                    <Typography sx={classes.valueDescription}>
                                        {value.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Container>

                {/* El Taller / Workshop Section */}
                <Box sx={classes.workshopSection}>
                    <Container maxWidth="lg">
                        <Box sx={classes.workshopGrid}>
                            <Box className="fade-in-up">
                                <Typography variant="h2" sx={classes.workshopTitle}>
                                    El Taller
                                </Typography>
                                <Typography sx={classes.workshopText}>
                                    Un espacio lleno de luz, polvo de arcilla y música suave. Aquí es donde ocurre
                                    la magia. Es mi refugio y mi laboratorio creativo.
                                </Typography>
                                <Typography sx={classes.workshopText}>
                                    Cada colección lleva mucho tiempo de desarrollo. Desde las pruebas de color de los
                                    esmaltes hasta encontrar la forma perfecta que se sienta bien en las manos.
                                </Typography>

                                <Box sx={classes.statsGrid}>
                                    {stats.map((stat, index) => (
                                        <Box key={index} sx={classes.statItem}>
                                            <Typography sx={classes.statNumber}>{stat.number}</Typography>
                                            <Typography sx={classes.statLabel}>{stat.label}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={classes.workshopImageContainer} className="fade-in-up-delay-1">
                                <Image
                                    src={ImgTaller}
                                    alt="Detalles del taller"
                                    width={800}
                                    height={800}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '16px',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* CTA Final */}
                <Box sx={classes.ctaSection}>
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
                                Ver Tienda Completa
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default AboutPage;
