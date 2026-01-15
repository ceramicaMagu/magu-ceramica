import theme from "@/theme/mui";
import { hexToRgba } from "@/utils/style";

const classes = {
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${hexToRgba(theme.palette.primary.main, 0.1)} 0%, ${hexToRgba(theme.palette.secondary.main, 0.1)} 100%)`,
        py: 4,
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        p: {
            xs: 3,
            md: 5
        },
        width: '100%',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: '50%',
        backgroundColor: hexToRgba(theme.palette.primary.main, 0.1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3,
    },
    icon: {
        fontSize: 40,
        color: theme.palette.primary.main,
    },
    title: {
        fontWeight: 700,
        textAlign: 'center',
        mb: 1,
        color: theme.palette.primary.main,
    },
    subtitle: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        mb: 4,
        fontSize: {
            xs: '0.9rem',
            md: '1rem'
        }
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    input: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 2,
        }
    },
    button: {
        mt: 2,
        py: 1.5,
        borderRadius: 2,
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '1rem',
    },
    footer: {
        mt: 4,
        pt: 3,
        borderTop: `1px solid ${hexToRgba(theme.palette.divider, 0.1)}`,
        textAlign: 'center',
        width: '100%',
        '& > *': {
            mb: 0.5,
        }
    }
};

export default classes;
