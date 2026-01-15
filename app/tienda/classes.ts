import theme from "@/theme/mui"
import { hexToRgba } from "@/utils/style"

const classes = {
    root: {
        pb: { xs: 6, md: 8 },
    },

    // Hero Section
    heroSection: {
        position: 'relative',
        minHeight: { xs: '40vh', md: '45vh' },
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
        maxWidth: '800px',
        width: '100%',
        mx: 'auto',
    },
    heroTitle: {
        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
        fontWeight: 800,
        mb: { xs: 2, md: 3 },
        textShadow: `3px 3px 8px ${hexToRgba('#000', 0.3)}`,
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
    },
    heroSubtitle: {
        fontSize: { xs: '1.05rem', md: '1.25rem' },
        color: hexToRgba(theme.palette.primary.contrastText, 0.98),
        lineHeight: 1.7,
        maxWidth: '600px',
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
        mb: { xs: 2, md: 3 },
        border: `1px solid ${hexToRgba(theme.palette.primary.contrastText, 0.2)}`,
    },

    // Filters Section
    filtersSection: {
        mb: { xs: 4, md: 5 },
    },
    filtersRow: {
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 3 },
        alignItems: 'stretch',
    },
    categorySelect: {
        flex: { xs: '1', sm: '0 1 250px' },
    },
    sortSelect: {
        flex: { xs: '1', sm: '0 1 250px' },
    },

    // Products Section
    productsSection: {
        mb: { xs: 4, md: 6 },
    },
    resultsHeader: {
        mb: { xs: 3, md: 4 },
    },
    resultsCount: {
        fontSize: { xs: '1rem', md: '1.1rem' },
        color: theme.palette.text.secondary,
        fontWeight: 500,
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
        },
        gap: { xs: 3, md: 4 },
    },

    // Product Card
    productCard: {
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 4px 12px ${hexToRgba(theme.palette.divider, 0.12)}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '&:hover': {
            boxShadow: `0 8px 24px ${hexToRgba(theme.palette.primary.main, 0.2)}`,
        }
    },
    productImageContainer: {
        position: 'relative',
        width: '100%',
        paddingTop: '70%', // 10:7 aspect ratio - más compacto
        overflow: 'hidden',
        backgroundColor: hexToRgba(theme.palette.divider, 0.03),
    },
    productImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    productBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        px: 2,
        py: 0.75,
        borderRadius: 50,
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        fontSize: '0.7rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        zIndex: 2,
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.secondary.main, 0.4)}`,
    },
    stockBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        px: 2,
        py: 0.75,
        borderRadius: 50,
        backgroundColor: hexToRgba('#000', 0.7),
        backdropFilter: 'blur(8px)',
        color: 'white',
        fontSize: '0.7rem',
        fontWeight: 600,
        zIndex: 2,
        boxShadow: `0 2px 8px ${hexToRgba('#000', 0.2)}`,
    },
    productInfo: {
        p: { xs: 2.5, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        flex: 1,
    },
    productName: {
        fontSize: { xs: '1.05rem', md: '1.15rem' },
        fontWeight: 700,
        color: theme.palette.text.primary,
        lineHeight: 1.3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        minHeight: { xs: '2.6rem', md: '3rem' },
    },
    productDescription: {
        fontSize: { xs: '0.85rem', md: '0.9rem' },
        color: theme.palette.text.secondary,
        lineHeight: 1.5,
        mb: 0.5,
    },
    productDescriptionText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    readMoreButton: {
        fontSize: '0.75rem',
        color: theme.palette.secondary.main,
        fontWeight: 600,
        cursor: 'pointer',
        textDecoration: 'none',
        mt: 0.5,
        display: 'inline-block',
        transition: 'color 0.2s ease',
        '&:hover': {
            color: theme.palette.secondary.dark,
            textDecoration: 'underline',
        }
    },
    productPrice: {
        fontSize: { xs: '1.35rem', md: '1.45rem' },
        fontWeight: 700,
        color: theme.palette.primary.main,
        mb: 1,
        mt: 0.5,
        lineHeight: 1,
    },
    addToCartButton: {
        mt: 'auto',
        borderRadius: 2.5,
        py: 1.25,
        fontWeight: 700,
        textTransform: 'none',
        fontSize: { xs: '0.95rem', md: '1rem' },
        boxShadow: `0 4px 12px ${hexToRgba(theme.palette.secondary.main, 0.25)}`,
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        '&:hover': {
            boxShadow: `0 6px 20px ${hexToRgba(theme.palette.secondary.main, 0.35)}`,
            transform: 'translateY(-2px)',
        },
        '&:disabled': {
            backgroundColor: hexToRgba(theme.palette.text.disabled, 0.12),
            color: theme.palette.text.disabled,
            boxShadow: 'none',
        }
    },

    // Pagination
    paginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: { xs: 5, md: 6 },
        mb: { xs: 2, md: 3 },
    },
    pagination: {
        '& .MuiPaginationItem-root': {
            fontSize: { xs: '0.9rem', md: '1rem' },
            fontWeight: 600,
        },
    },

    // Empty State
    emptyState: {
        textAlign: 'center',
        py: { xs: 8, md: 12 },
    },
    emptyStateIcon: {
        fontSize: { xs: '4rem', md: '5rem' },
        color: theme.palette.divider,
        mb: 2,
    },
    emptyStateTitle: {
        fontSize: { xs: '1.5rem', md: '2rem' },
        fontWeight: 700,
        color: theme.palette.text.primary,
        mb: 1,
    },
    emptyStateText: {
        fontSize: { xs: '1rem', md: '1.1rem' },
        color: theme.palette.text.secondary,
        maxWidth: '500px',
        mx: 'auto',
        mb: 3,
    },
}

export default classes
