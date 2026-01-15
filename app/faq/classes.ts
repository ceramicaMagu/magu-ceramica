import theme from "@/theme/mui"
import { hexToRgba } from "@/utils/style"

const classes = {
    root: {
        pb: { xs: 6, md: 8 },
    },

    // Hero Section
    heroSection: {
        position: 'relative',
        minHeight: { xs: '45vh', md: '50vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${hexToRgba(theme.palette.primary.main, 0.95)} 0%, ${hexToRgba(theme.palette.secondary.main, 0.9)} 100%)`,
        overflow: 'hidden',
        mb: { xs: 6, md: 8 },
        mx: { xs: -2, sm: -3, md: -6 },
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, md: 5 },
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
    },
    heroContent: {
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        maxWidth: '900px',
        width: '100%',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem' },
        fontWeight: 800,
        mb: { xs: 3, md: 4 },
        textShadow: `3px 3px 8px ${hexToRgba('#000', 0.3)}`,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
    },
    heroSubtitle: {
        fontSize: { xs: '1.1rem', md: '1.35rem' },
        color: hexToRgba(theme.palette.primary.contrastText, 0.98),
        lineHeight: 1.7,
        maxWidth: '650px',
        mx: 'auto',
        textShadow: `1px 1px 3px ${hexToRgba('#000', 0.2)}`,
    },
    heroBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        px: { xs: 2, md: 3 },
        py: { xs: 0.75, md: 1 },
        borderRadius: 50,
        backgroundColor: hexToRgba(theme.palette.primary.contrastText, 0.15),
        backdropFilter: 'blur(10px)',
        mb: { xs: 3, md: 4 },
        border: `1px solid ${hexToRgba(theme.palette.primary.contrastText, 0.2)}`,
    },

    // FAQ Section
    faqSection: {
        mb: { xs: 6, md: 8 },
    },
    sectionTitle: {
        fontSize: { xs: '2rem', md: '2.75rem' },
        fontWeight: 700,
        color: theme.palette.primary.main,
        textAlign: 'center',
        mb: 2,
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '4px',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 2,
        }
    },
    sectionSubtitle: {
        fontSize: { xs: '1rem', md: '1.15rem' },
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: '700px',
        mx: 'auto',
        mb: { xs: 5, md: 6 },
        lineHeight: 1.6,
    },

    // Accordion Styles
    accordion: {
        mb: 2,
        borderRadius: '12px !important',
        overflow: 'hidden',
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.divider, 0.1)} !important`,
        transition: 'all 0.3s ease !important',
        '&:before': {
            display: 'none',
        },
        '&.Mui-expanded': {
            margin: '0 0 16px 0 !important',
            boxShadow: `0 8px 24px ${hexToRgba(theme.palette.primary.main, 0.15)} !important`,
        }
    },
    accordionSummary: {
        minHeight: { xs: '64px !important', md: '72px !important' },
        px: { xs: 2.5, md: 3.5 },
        py: { xs: 1.5, md: 2 },
        '&.Mui-expanded': {
            minHeight: { xs: '64px !important', md: '72px !important' },
            borderBottom: `1px solid ${hexToRgba(theme.palette.divider, 0.1)}`,
        },
        '& .MuiAccordionSummary-content': {
            my: { xs: 1, md: 1.5 },
            '&.Mui-expanded': {
                my: { xs: 1, md: 1.5 },
            }
        }
    },
    accordionQuestion: {
        fontSize: { xs: '1.05rem', md: '1.2rem' },
        fontWeight: 600,
        color: theme.palette.text.primary,
        lineHeight: 1.4,
    },
    accordionDetails: {
        px: { xs: 2.5, md: 3.5 },
        py: { xs: 2.5, md: 3 },
        backgroundColor: hexToRgba(theme.palette.secondary.light, 0.03),
    },
    accordionAnswer: {
        fontSize: { xs: '0.95rem', md: '1.05rem' },
        color: theme.palette.text.secondary,
        lineHeight: 1.75,
    },

    // Categories
    categoriesSection: {
        mb: { xs: 6, md: 8 },
    },
    categoriesGrid: {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: { xs: 2.5, md: 3 },
        mb: { xs: 5, md: 6 },
    },
    categoryChip: {
        px: { xs: 3, md: 4 },
        py: { xs: 1.5, md: 1.75 },
        fontSize: { xs: '0.95rem', md: '1.05rem' },
        fontWeight: 600,
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        border: `2px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '&:hover': {
            transform: 'translateY(-3px)',
            borderColor: theme.palette.secondary.main,
            backgroundColor: hexToRgba(theme.palette.secondary.light, 0.1),
            color: theme.palette.primary.main,
        }
    },
    categoryChipActive: {
        borderColor: theme.palette.secondary.main,
        backgroundColor: hexToRgba(theme.palette.secondary.main, 0.1),
        color: theme.palette.primary.main,
        fontWeight: 700,
    },

    // CTA Section
    ctaSection: {
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
        py: { xs: 6, md: 8 },
        mt: { xs: 6, md: 8 },
        mx: { xs: -2, sm: -3, md: -6 },
        px: { xs: 2, sm: 3, md: 6 },
        borderRadius: 0,
    },
    ctaTitle: {
        fontSize: { xs: '1.75rem', md: '2.25rem' },
        fontWeight: 700,
        mb: { xs: 2, md: 2.5 },
        color: theme.palette.primary.contrastText,
    },
    ctaSubtitle: {
        fontSize: { xs: '1rem', md: '1.15rem' },
        mb: { xs: 3, md: 4 },
        color: hexToRgba(theme.palette.primary.contrastText, 0.95),
        lineHeight: 1.7,
        maxWidth: '600px',
        mx: 'auto',
    },
    ctaButton: {
        px: { xs: 4, md: 5 },
        py: { xs: 1.75, md: 2 },
        fontSize: { xs: '1.05rem', md: '1.15rem' },
        borderRadius: 3,
        fontWeight: 700,
        textTransform: 'none',
        boxShadow: `0 6px 20px ${hexToRgba('#000', 0.25)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        letterSpacing: '0.5px',
    },
}

export default classes
