import theme from "@/theme/mui"
import { hexToRgba } from "@/utils/style"

const classes = {
    heroSection: {
        position: 'relative',
        minHeight: {
            xs: '60vh',
            md: '65vh'
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${hexToRgba(theme.palette.primary.main, 0.95)} 0%, ${hexToRgba(theme.palette.secondary.main, 0.9)} 100%)`,
        overflow: 'hidden',
        mb: {
            xs: 6,
            md: 8
        },
        py: {
            xs: 6,
            md: 8
        },
        mx: {
            xs: -2,
            sm: -3,
            md: -6,
        },
        px: {
            xs: 2,
            sm: 3,
            md: 6,
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
            animation: 'patternMove 20s linear infinite',
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: {
                xs: '150px',
                md: '300px'
            },
            height: {
                xs: '150px',
                md: '300px'
            },
            backgroundImage: 'url("https://picsum.photos/seed/ceramica-bg-blur/400/400")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '50%',
            opacity: 0.15,
            filter: 'blur(40px)',
            zIndex: 0,
        }
    },
    heroContent: {
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        maxWidth: '900px',
        width: '100%',
        mx: 'auto',
        px: {
            xs: 2,
            md: 4
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroTitle: {
        fontSize: {
            xs: '2.5rem',
            sm: '3rem',
            md: '3.75rem',
            lg: '4.25rem'
        },
        fontWeight: 700,
        mb: {
            xs: 2,
            md: 3
        },
        textShadow: `2px 2px 6px ${hexToRgba('#000', 0.25)}`,
        letterSpacing: {
            xs: '-0.01em',
            md: '-0.02em'
        },
        lineHeight: {
            xs: 1.2,
            md: 1.15
        },
    },
    heroSubtitle: {
        fontSize: {
            xs: '1.05rem',
            sm: '1.15rem',
            md: '1.25rem',
            lg: '1.35rem'
        },
        mb: {
            xs: 3,
            md: 4
        },
        color: hexToRgba(theme.palette.primary.contrastText, 0.95),
        lineHeight: {
            xs: 1.5,
            md: 1.6
        },
        fontWeight: 400,
        maxWidth: '650px',
        mx: 'auto',
        textShadow: `1px 1px 2px ${hexToRgba('#000', 0.15)}`,
    },
    heroBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: {
            xs: 2,
            md: 3
        },
        py: {
            xs: 0.75,
            md: 1
        },
        borderRadius: 50,
        backgroundColor: hexToRgba(theme.palette.primary.contrastText, 0.15),
        backdropFilter: 'blur(10px)',
        mb: {
            xs: 3,
            md: 4
        },
        border: `1px solid ${hexToRgba(theme.palette.primary.contrastText, 0.2)}`,
    },
    heroButtons: {
        display: 'flex',
        gap: {
            xs: 2,
            md: 3
        },
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        mt: {
            xs: 2,
            md: 3
        },
    },
    heroButton: {
        px: {
            xs: 3.5,
            md: 4
        },
        py: {
            xs: 1.5,
            md: 1.75
        },
        fontSize: {
            xs: '1rem',
            md: '1.1rem'
        },
        borderRadius: 2.5,
        fontWeight: 700,
        textTransform: 'none',
        boxShadow: `0 4px 16px ${hexToRgba('#000', 0.2)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        letterSpacing: '0.3px',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 24px ${hexToRgba('#000', 0.3)}`,
        },
        '&:active': {
            transform: 'translateY(0px)',
        }
    },
    heroImageDecorator: {
        position: 'absolute',
        bottom: {
            xs: '-50px',
            md: '-80px'
        },
        left: {
            xs: '5%',
            md: '10%'
        },
        width: {
            xs: '120px',
            md: '200px'
        },
        height: {
            xs: '120px',
            md: '200px'
        },
        borderRadius: '50%',
        border: `4px solid ${hexToRgba(theme.palette.primary.contrastText, 0.2)}`,
        overflow: 'hidden',
        opacity: 0.3,
        zIndex: 0,
        transform: 'rotate(-15deg)',
    },
    section: {
        py: {
            xs: 6,
            md: 9
        },
        px: {
            xs: 2,
            md: 0
        },
    },
    sectionTitle: {
        fontSize: {
            xs: '1.75rem',
            md: '2.25rem'
        },
        fontWeight: 700,
        textAlign: 'center',
        mb: {
            xs: 3,
            md: 4
        },
        color: theme.palette.primary.main,
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '3px',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 2,
        }
    },
    sectionSubtitle: {
        fontSize: {
            xs: '0.95rem',
            md: '1.05rem'
        },
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: '650px',
        mx: 'auto',
        mb: {
            xs: 5,
            md: 7
        },
        lineHeight: 1.6,
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
        },
        gap: {
            xs: 3,
            md: 4
        },
        mt: {
            xs: 4,
            md: 6
        },
    },
    productCard: {
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.divider, 0.15)}`,
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '&:hover': {
            boxShadow: `0 8px 20px ${hexToRgba(theme.palette.primary.main, 0.25)}`,
        }
    },
    productImage: {
        width: '100%',
        height: {
            xs: '220px',
            md: '260px'
        },
        objectFit: 'cover',
    },
    productInfo: {
        p: {
            xs: 2.5,
            md: 3
        },
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    productName: {
        fontSize: {
            xs: '1.05rem',
            md: '1.15rem'
        },
        fontWeight: 600,
        mb: 1,
        color: theme.palette.text.primary,
        lineHeight: 1.3,
    },
    productPrice: {
        fontSize: {
            xs: '1.25rem',
            md: '1.35rem'
        },
        fontWeight: 700,
        color: theme.palette.primary.main,
        mt: 'auto',
    },
    aboutSection: {
        backgroundColor: hexToRgba(theme.palette.secondary.light, 0.2),
        mx: {
            xs: -2,
            sm: -3,
            md: -6,
        },
        px: {
            xs: 2,
            sm: 3,
            md: 6,
        },
    },
    aboutContent: {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr'
        },
        gap: {
            xs: 4,
            md: 6
        },
        alignItems: 'center',
    },
    aboutImage: {
        width: '100%',
        borderRadius: 3,
        boxShadow: `0 4px 16px ${hexToRgba(theme.palette.divider, 0.3)}`,
        objectFit: 'cover',
        maxHeight: '500px',
    },
    aboutText: {
        fontSize: {
            xs: '1rem',
            md: '1.1rem'
        },
        lineHeight: 1.8,
        color: theme.palette.text.secondary,
        mb: 3,
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
        },
        gap: {
            xs: 3,
            md: 4
        },
        mt: {
            xs: 4,
            md: 6
        },
    },
    featureCard: {
        textAlign: 'center',
        p: {
            xs: 3,
            md: 4
        },
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 6px 20px ${hexToRgba(theme.palette.secondary.main, 0.2)}`,
        }
    },
    featureIcon: {
        fontSize: {
            xs: '3rem',
            md: '4rem'
        },
        color: theme.palette.primary.main,
        mb: 2,
    },
    featureTitle: {
        fontSize: {
            xs: '1.2rem',
            md: '1.4rem'
        },
        fontWeight: 600,
        mb: 1,
        color: theme.palette.text.primary,
    },
    featureDescription: {
        fontSize: {
            xs: '0.9rem',
            md: '1rem'
        },
        color: theme.palette.text.secondary,
        lineHeight: 1.6,
    },
    ctaSection: {
        backgroundColor: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
        mx: {
            xs: -2,
            sm: -3,
            md: -6,
        },
        px: {
            xs: 2,
            sm: 3,
            md: 6,
        },
    },
    ctaTitle: {
        fontSize: {
            xs: '2rem',
            md: '3rem'
        },
        fontWeight: 700,
        mb: {
            xs: 2,
            md: 3
        },
        color: theme.palette.primary.contrastText,
    },
    ctaSubtitle: {
        fontSize: {
            xs: '1.1rem',
            md: '1.3rem'
        },
        mb: {
            xs: 3,
            md: 4
        },
        color: hexToRgba(theme.palette.primary.contrastText, 0.95),
    },
    processSection: {
        backgroundColor: hexToRgba(theme.palette.primary.light, 0.05),
        mx: {
            xs: -2,
            sm: -3,
            md: -6,
        },
        px: {
            xs: 2,
            sm: 3,
            md: 6,
        },
    },
    processSteps: {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)'
        },
        gap: {
            xs: 4,
            md: 6
        },
        mt: {
            xs: 4,
            md: 6
        },
        position: 'relative',
    },
    processStep: {
        textAlign: 'center',
        position: 'relative',
        p: {
            xs: 3,
            md: 4
        },
    },
    processStepNumber: {
        fontSize: {
            xs: '3rem',
            md: '4rem'
        },
        fontWeight: 700,
        color: hexToRgba(theme.palette.primary.main, 0.2),
        lineHeight: 1,
        mb: 2,
    },
    processStepTitle: {
        fontSize: {
            xs: '1.2rem',
            md: '1.4rem'
        },
        fontWeight: 600,
        mb: 1.5,
        color: theme.palette.text.primary,
    },
    processStepDescription: {
        fontSize: {
            xs: '0.95rem',
            md: '1rem'
        },
        color: theme.palette.text.secondary,
        lineHeight: 1.7,
    },
    testimonialsSection: {
        backgroundColor: hexToRgba(theme.palette.secondary.light, 0.15),
        mx: {
            xs: -2,
            sm: -3,
            md: -6,
        },
        px: {
            xs: 2,
            sm: 3,
            md: 6,
        },
    },
    testimonialsGrid: {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)'
        },
        gap: {
            xs: 3,
            md: 4
        },
        mt: {
            xs: 4,
            md: 6
        },
    },
    testimonialCard: {
        p: {
            xs: 3,
            md: 4
        },
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease',
        position: 'relative',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 8px 24px ${hexToRgba(theme.palette.primary.main, 0.15)}`,
        },
        '&::before': {
            content: '"\\201C"',
            position: 'absolute',
            top: 10,
            left: 15,
            fontSize: '4rem',
            color: hexToRgba(theme.palette.primary.main, 0.1),
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
        }
    },
    testimonialText: {
        fontSize: {
            xs: '0.95rem',
            md: '1rem'
        },
        lineHeight: 1.7,
        color: theme.palette.text.secondary,
        mb: 2,
        fontStyle: 'italic',
    },
    testimonialAuthor: {
        fontSize: {
            xs: '0.9rem',
            md: '1rem'
        },
        fontWeight: 600,
        color: theme.palette.primary.main,
    },
    gallerySection: {
        py: {
            xs: 6,
            md: 10
        },
    },
    galleryGrid: {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
        },
        gap: {
            xs: 2,
            md: 3
        },
        mt: {
            xs: 4,
            md: 6
        },
    },
    galleryItem: {
        position: 'relative',
        borderRadius: 3,
        aspectRatio: '1',
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.divider, 0.2)}`,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: `0 8px 24px ${hexToRgba(theme.palette.primary.main, 0.2)}`,
        }
    },
    categoriesGrid: {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)'
        },
        gap: {
            xs: 3,
            md: 4
        },
    },
    categoryCard: {
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.divider, 0.15)}`,
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 28px ${hexToRgba(theme.palette.primary.main, 0.25)}`,
        }
    },
    categoryImageContainer: {
        position: 'relative',
        width: '100%',
        paddingTop: '85%',
        overflow: 'hidden',
        backgroundColor: hexToRgba(theme.palette.divider, 0.05),
    },
    categoryInfo: {
        p: {
            xs: 2.5,
            md: 3
        },
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
    },
    categoryName: {
        fontSize: {
            xs: '1.15rem',
            md: '1.25rem'
        },
        fontWeight: 600,
        mb: 0.5,
        color: theme.palette.text.primary,
    },
    categoryCount: {
        fontSize: {
            xs: '0.85rem',
            md: '0.9rem'
        },
        color: theme.palette.text.secondary,
        fontWeight: 500,
    },
    ctaButton: {
        px: { xs: 4, md: 5 },
        py: { xs: 1.75, md: 2.25 },
        fontSize: { xs: '1.1rem', md: '1.2rem' },
        borderRadius: 3,
        fontWeight: 700,
        textTransform: 'none',
        boxShadow: `0 6px 20px ${hexToRgba('#000', 0.25)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        letterSpacing: '0.5px',
    },
}


export default classes

