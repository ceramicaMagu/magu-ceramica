import theme from "@/theme/mui";
import { hexToRgba } from "@/utils/style";

const classes = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2,
    },
    sectionTitle: {
        fontWeight: 700,
        color: theme.palette.primary.main,
        mb: 3,
        fontSize: {
            xs: '1.25rem',
            md: '1.5rem'
        }
    },
    subsectionTitle: {
        fontWeight: 600,
        color: theme.palette.text.primary,
        mb: 2,
    },
    addButton: {
        textTransform: 'none',
        borderRadius: 2,
        px: 3,
    },
    tableContainer: {
        borderRadius: 2,
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.divider, 0.1)}`,
        overflowX: 'auto',
        '& .MuiTable-root': {
            minWidth: {
                xs: 650,
                md: 'auto'
            }
        }
    },
    tableHeader: {
        fontWeight: 600,
        backgroundColor: hexToRgba(theme.palette.primary.main, 0.05),
    },
    productImage: {
        width: 60,
        height: 60,
        objectFit: 'cover',
        borderRadius: 1,
    },
    productName: {
        fontWeight: 500,
    },
    categoryChip: {
        backgroundColor: hexToRgba(theme.palette.secondary.main, 0.1),
        color: theme.palette.secondary.main,
        fontWeight: 500,
    },
    price: {
        fontWeight: 600,
        color: theme.palette.primary.main,
    },
    actionButtons: {
        display: 'flex',
        gap: 0.5,
    },
    paper: {
        p: {
            xs: 2,
            md: 4
        },
        borderRadius: 2,
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.divider, 0.1)}`,
    },
};

export default classes;
