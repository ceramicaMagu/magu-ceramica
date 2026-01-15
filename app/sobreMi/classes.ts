import theme from "@/theme/mui"
import { hexToRgba } from "@/utils/style"

const classes = {
    root: {
        pb: { xs: 6, md: 8 },
    },

    // Hero Section - Similar a la home
    heroSection: {
        position: 'relative',
        minHeight: { xs: '50vh', md: '55vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${hexToRgba(theme.palette.primary.main, 0.95)} 0%, ${hexToRgba(theme.palette.secondary.main, 0.9)} 100%)`,
        overflow: 'hidden',
        mb: { xs: 6, md: 8 },
        mx: { xs: -2, sm: -3, md: -6 },
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 5, md: 6 },
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
        fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
        fontWeight: 800,
        mb: { xs: 3, md: 4 },
        textShadow: `3px 3px 8px ${hexToRgba('#000', 0.3)}`,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
    },
    heroSubtitle: {
        fontSize: { xs: '1.15rem', md: '1.5rem' },
        color: hexToRgba(theme.palette.primary.contrastText, 0.98),
        lineHeight: 1.7,
        maxWidth: '750px',
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

    // Sections
    section: {
        mb: { xs: 6, md: 8 },
        position: 'relative',
    },

    // Section Titles
    sectionTitle: {
        fontSize: { xs: '1.75rem', md: '2.25rem' },
        fontWeight: 700,
        color: theme.palette.primary.dark,
        mb: 3,
        position: 'relative',
        display: 'inline-block',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: '60px',
            height: '3px',
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 2,
        }
    },
    sectionTitleCentered: {
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
        mb: { xs: 4, md: 5 },
        lineHeight: 1.6,
    },

    // Bio Section
    bioContainer: {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1.3fr' },
        gap: { xs: 4, md: 6 },
        alignItems: 'center',
    },
    bioImageContainer: {
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: `0 10px 30px ${hexToRgba(theme.palette.primary.main, 0.2)}`,
        '&::before': {
            content: '""',
            display: 'block',
            paddingTop: '125%',
        },
    },
    bioContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
    },
    paragraph: {
        fontSize: { xs: '1rem', md: '1.05rem' },
        lineHeight: 1.75,
        color: theme.palette.text.secondary,
    },
    highlightBox: {
        p: { xs: 3, md: 3.5 },
        borderRadius: 2,
        backgroundColor: hexToRgba(theme.palette.secondary.main, 0.08),
        borderLeft: `4px solid ${theme.palette.secondary.main}`,
        my: 1,
    },
    highlightText: {
        fontSize: { xs: '1.05rem', md: '1.2rem' },
        fontWeight: 600,
        color: theme.palette.primary.dark,
        fontStyle: 'italic',
        lineHeight: 1.6,
    },

    // Values Section
    valuesGrid: {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: { xs: 3, md: 4 },
        mt: { xs: 4, md: 5 },
    },
    valueCard: {
        p: { xs: 3.5, md: 4 },
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 4px 12px ${hexToRgba(theme.palette.divider, 0.15)}`,
        transition: 'all 0.3s ease',
        textAlign: 'center',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 32px ${hexToRgba(theme.palette.primary.main, 0.2)}`,
        }
    },
    valueIcon: {
        fontSize: '3.5rem',
        color: theme.palette.secondary.main,
        mb: 2,
    },
    valueTitle: {
        fontSize: '1.35rem',
        fontWeight: 700,
        color: theme.palette.text.primary,
        mb: 1.5,
    },
    valueDescription: {
        fontSize: '0.95rem',
        color: theme.palette.text.secondary,
        lineHeight: 1.65,
    },

    // Workshop Section
    workshopSection: {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.background.paper,
        py: { xs: 6, md: 8 },
        mx: { xs: -2, sm: -3, md: -6 },
        px: { xs: 2, sm: 3, md: 6 },
        position: 'relative',
        overflow: 'hidden',
    },
    workshopGrid: {
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: { xs: 4, md: 6 },
        alignItems: 'center',
    },
    workshopTitle: {
        fontSize: { xs: '2rem', md: '2.75rem' },
        fontWeight: 700,
        color: 'white',
        mb: 3,
    },
    workshopText: {
        fontSize: { xs: '1rem', md: '1.05rem' },
        color: hexToRgba('#fff', 0.85),
        mb: 2.5,
        lineHeight: 1.7,
    },
    workshopImageContainer: {
        position: 'relative',
        height: { xs: '350px', md: '450px' },
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: `0 10px 30px ${hexToRgba('#000', 0.3)}`,
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 3,
        mt: 4,
    },
    statItem: {
        textAlign: 'center',
        p: 2,
        borderRadius: 2,
        backgroundColor: hexToRgba('#fff', 0.05),
    },
    statNumber: {
        fontSize: { xs: '2.5rem', md: '3rem' },
        fontWeight: 700,
        color: theme.palette.secondary.main,
        lineHeight: 1,
        mb: 0.5,
    },
    statLabel: {
        fontSize: '0.95rem',
        color: hexToRgba('#fff', 0.75),
        fontWeight: 500,
    },

    // CTA Section - Igual que en home
    ctaSection: {
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
        py: { xs: 6, md: 8 },
        mt: { xs: 6, md: 8 },
        mx: { xs: -2, sm: -3, md: -6 },
        px: { xs: 2, sm: 3, md: 6 },
    },
    ctaTitle: {
        fontSize: { xs: '2rem', md: '2.75rem' },
        fontWeight: 700,
        mb: { xs: 2, md: 3 },
        color: theme.palette.primary.contrastText,
    },
    ctaSubtitle: {
        fontSize: { xs: '1.05rem', md: '1.2rem' },
        mb: { xs: 3, md: 4 },
        color: hexToRgba(theme.palette.primary.contrastText, 0.95),
        lineHeight: 1.7,
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
