"use client";

import { Box, Container, Link as MuiLink, Typography } from "@mui/material";
import Image from "next/image";
import Logo from '@/public/logo.webp';
import GecLogo from '@/public/logo-lobo-transparente.png';
import { SOCIAL_NETWORKS } from "@/constants/social";
import footerClasses from "./footerClasses";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import TikTokIcon from "./TikTokIcon";
import { useAppSelector } from "@/state/redux/store";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const siteConfig = useAppSelector(state => state.auth.siteConfig);

    // Usar solo datos de Redux configurados en el panel de admin
    // No mostrar redes sociales que no tengan datos configurados
    const socialMedia = {
        instagram: siteConfig.socialMedia.instagram,
        facebook: siteConfig.socialMedia.facebook,
        twitter: siteConfig.socialMedia.twitter,
        linkedin: siteConfig.socialMedia.linkedin,
        tiktok: siteConfig.socialMedia.tiktok,
        whatsapp: siteConfig.socialMedia.whatsapp,
    };

    return (
        <Box component="footer" sx={footerClasses.footerContainer}>
            <Container maxWidth="xl">
                <Box sx={footerClasses.footerContent}>
                    {/* Sección Logo y Descripción */}
                    <Box sx={footerClasses.footerSectionLogo}>
                        <Box sx={footerClasses.footerLogoContainer}>
                            <Box sx={footerClasses.footerLogo}>
                                <Image
                                    src={Logo}
                                    alt="Magu Cerámica"
                                    height={60}
                                    priority
                                />
                            </Box>
                            <Typography sx={footerClasses.footerDescription}>
                                Piezas únicas creadas artesanalmente para acompañar tus momentos más especiales.
                                Reales y mágicas.
                            </Typography>
                        </Box>
                    </Box>

                    {/* Sección Contacto */}
                    <Box sx={footerClasses.footerSection}>
                        <Typography sx={footerClasses.footerSectionTitleContact}>
                            Contacto
                        </Typography>
                        <Box sx={footerClasses.contactInfo}>
                            {socialMedia.whatsapp && (
                                <Box sx={footerClasses.contactItem}>
                                    <PhoneIcon fontSize="small" />
                                    <MuiLink
                                        href={`https://wa.me/${socialMedia.whatsapp.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={footerClasses.contactLink}
                                    >
                                        WhatsApp
                                    </MuiLink>
                                </Box>
                            )}
                            {socialMedia.facebook && (
                                <Box sx={footerClasses.contactItem}>
                                    <FacebookIcon fontSize="small" />
                                    <MuiLink
                                        href={socialMedia.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={footerClasses.contactLink}
                                    >
                                        Facebook
                                    </MuiLink>
                                </Box>
                            )}
                            {socialMedia.instagram && (
                                <Box sx={footerClasses.contactItem}>
                                    <InstagramIcon fontSize="small" />
                                    <MuiLink
                                        href={socialMedia.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={footerClasses.contactLink}
                                    >
                                        Instagram
                                    </MuiLink>
                                </Box>
                            )}
                            {socialMedia.twitter && (
                                <Box sx={footerClasses.contactItem}>
                                    <TwitterIcon fontSize="small" />
                                    <MuiLink
                                        href={socialMedia.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={footerClasses.contactLink}
                                    >
                                        Twitter
                                    </MuiLink>
                                </Box>
                            )}
                            {socialMedia.linkedin && (
                                <Box sx={footerClasses.contactItem}>
                                    <LinkedInIcon fontSize="small" />
                                    <MuiLink
                                        href={socialMedia.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={footerClasses.contactLink}
                                    >
                                        LinkedIn
                                    </MuiLink>
                                </Box>
                            )}
                            {socialMedia.tiktok && (
                                <Box sx={footerClasses.contactItem}>
                                    <TikTokIcon fontSize="small" />
                                    <MuiLink
                                        href={socialMedia.tiktok}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        sx={footerClasses.contactLink}
                                    >
                                        TikTok
                                    </MuiLink>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Footer Bottom */}
                <Box sx={footerClasses.footerBottom}>
                    <Typography sx={footerClasses.copyright}>
                        © {currentYear} {SOCIAL_NETWORKS.companyName}. Todos los derechos reservados.
                    </Typography>
                    <MuiLink
                        href="https://gecdigital.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={footerClasses.createdByLink}
                    >
                        <Box sx={footerClasses.gecLogoContainer}>
                            <Image
                                src={GecLogo}
                                alt="GEC Soluciones Digitales"
                                width={24}
                                height={24}
                                style={{
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                        Creado por <Typography component={'span'} sx={footerClasses.textGec}>GEC Soluciones Digitales</Typography>
                    </MuiLink>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;

