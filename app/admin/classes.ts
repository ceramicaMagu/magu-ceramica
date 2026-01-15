import theme from "@/theme/mui";
import { hexToRgba } from "@/utils/style";

const classes = {
    root: {
        minHeight: '100vh',
        backgroundColor: hexToRgba(theme.palette.secondary.light, 0.05),
    },
    loadingContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${hexToRgba(theme.palette.divider, 0.1)}`,
        py: {
            xs: 2,
            md: 3
        },
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: {
            xs: 'flex-start',
            sm: 'center'
        },
        flexDirection: {
            xs: 'column',
            sm: 'row'
        },
        gap: 2,
    },
    headerTitle: {
        fontWeight: 700,
        color: theme.palette.primary.main,
        fontSize: {
            xs: '1.5rem',
            md: '2rem'
        }
    },
    headerSubtitle: {
        color: theme.palette.text.secondary,
        fontSize: {
            xs: '0.9rem',
            md: '1rem'
        }
    },
    logoutButton: {
        textTransform: 'none',
        borderRadius: 2,
        px: 3,
    },
    tabsContainer: {
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${hexToRgba(theme.palette.divider, 0.1)}`,
    },
    tabs: {
        '& .MuiTab-root': {
            textTransform: 'none',
            fontSize: {
                xs: '0.85rem',
                md: '1rem'
            },
            fontWeight: 500,
            minHeight: {
                xs: 56,
                md: 64
            },
            px: {
                xs: 2,
                md: 3
            }
        }
    },
    tab: {
        gap: {
            xs: 0.5,
            md: 1
        },
        '& .MuiTab-iconWrapper': {
            fontSize: {
                xs: '1.2rem',
                md: '1.5rem'
            }
        }
    },
    content: {
        py: {
            xs: 3,
            md: 4
        },
        px: {
            xs: 2,
            sm: 3,
            md: 0
        }
    },
};

export default classes;
