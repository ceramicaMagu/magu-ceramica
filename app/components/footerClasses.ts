import theme from "@/theme/mui"
import { hexToRgba } from "@/utils/style"

const footerClasses = {
    footerContainer: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        mt: 'auto',
        pt: {
            xs: 3,
            md: 4
        },
        pb: {
            xs: 1.5,
            md: 2
        },
    },
    footerContent: {
        display: 'flex',
        flexDirection: {
            xs: 'column',
            md: 'row'
        },
        justifyContent: {
            xs: 'flex-start',
            md: 'space-between'
        },
        alignItems: {
            xs: 'flex-start',
            md: 'flex-start'
        },
        gap: {
            xs: 3,
            md: 4
        },
        mb: {
            xs: 2,
            md: 3
        },
    },
    footerSection: {
        flex: {
            xs: 'none',
            md: 1
        },
        width: {
            xs: '100%',
            md: 'auto'
        },
        minWidth: {
            xs: '100%',
            sm: '200px'
        },
        display: 'flex',
        flexDirection: 'column',
        gap: {
            xs: 2,
            md: 2
        },
        alignItems: 'flex-start',
    },
    footerSectionLogo: {
        flex: {
            xs: 'none',
            md: 1
        },
        width: {
            xs: '100%',
            md: 'auto'
        },
        minWidth: {
            xs: '100%',
            sm: '200px'
        },
        display: 'flex',
        flexDirection: {
            xs: 'row',
            md: 'column'
        },
        gap: {
            xs: 2,
            md: 2
        },
        alignItems: {
            xs: 'flex-start',
            md: 'flex-start'
        },
    },
    footerSectionTitle: {
        fontWeight: 'bold',
        fontSize: {
            xs: 16,
            md: 18
        },
        mb: {
            xs: 0.5,
            md: 1
        },
        color: theme.palette.primary.contrastText,
    },
    footerSectionTitleContact: {
        fontWeight: 'bold',
        fontSize: {
            xs: 16,
            md: 18
        },
        mb: {
            xs: 0.5,
            md: 1
        },
        color: theme.palette.background.paper,
        borderBottom: `2px solid ${theme.palette.background.paper}`,
        pb: 0.5,
        display: 'inline-block',
    },
    footerLogoContainer: {
        display: 'flex',
        flexDirection: {
            xs: 'row',
            md: 'column'
        },
        gap: {
            xs: 2,
            md: 2
        },
        alignItems: {
            xs: 'flex-start',
            md: 'flex-start'
        },
        width: {
            xs: '100%',
            md: 'auto'
        },
    },
    footerLogo: {
        display: 'flex',
        alignItems: 'center',
        mb: {
            xs: 0,
            md: 1
        },
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        p: {
            xs: 0.75,
            md: 1
        },
        maxWidth: 'fit-content',
        flexShrink: 0,
        '& img': {
            height: {
                xs: 50,
                md: 60
            }
        }
    },
    footerDescription: {
        fontSize: {
            xs: 13,
            md: 14
        },
        lineHeight: 1.6,
        color: hexToRgba(theme.palette.primary.contrastText, 0.9),
        width: {
            xs: '100%',
            md: 'auto'
        },
        maxWidth: {
            xs: '100%',
            md: '100%'
        },
        flex: {
            xs: 1,
            md: 'none'
        },
    },
    footerLink: {
        color: hexToRgba(theme.palette.primary.contrastText, 0.9),
        textDecoration: 'none',
        fontSize: 14,
        transition: 'all 0.3s ease',
        '&:hover': {
            color: theme.palette.primary.contrastText,
            paddingLeft: 1,
        }
    },
    contactInfo: {
        display: 'grid',
        gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)'
        },
        gap: {
            xs: 0.75,
            md: 1
        },
        width: '100%',
    },
    contactItem: {
        display: 'flex',
        alignItems: 'center',
        gap: {
            xs: 0.75,
            md: 1
        },
        color: hexToRgba(theme.palette.primary.contrastText, 0.9),
        fontSize: {
            xs: 13,
            md: 14
        },
        transition: 'all 0.3s ease',
        width: '100%',
        '&:hover': {
            transform: 'translateX(4px)',
            '& svg, & a': {
                color: theme.palette.primary.contrastText,
            }
        }
    },
    contactLink: {
        color: hexToRgba(theme.palette.primary.contrastText, 0.9),
        textDecoration: 'none',
        fontSize: {
            xs: 13,
            md: 14
        },
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        '&:hover': {
            color: theme.palette.primary.contrastText,
        }
    },
    footerBottom: {
        borderTop: `1px solid ${hexToRgba(theme.palette.primary.contrastText, 0.2)}`,
        pt: {
            xs: 1.5,
            md: 2
        },
        mt: {
            xs: 2,
            md: 3
        },
        display: 'flex',
        flexDirection: {
            xs: 'column',
            sm: 'row'
        },
        justifyContent: 'space-between',
        alignItems: {
            xs: 'center',
            sm: 'center'
        },
        gap: {
            xs: 1,
            sm: 2
        },
    },
    copyright: {
        fontSize: {
            xs: 11,
            md: 12
        },
        color: hexToRgba(theme.palette.primary.contrastText, 0.8),
        textAlign: {
            xs: 'center',
            sm: 'left'
        },
    },
    createdByLink: {
        fontSize: {
            xs: 11,
            md: 12
        },
        color: hexToRgba(theme.palette.primary.contrastText, 0.8),
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        textAlign: {
            xs: 'center',
            sm: 'right'
        },
        whiteSpace: 'nowrap',
        '&:hover': {
            color: theme.palette.primary.contrastText,
            textDecoration: 'underline',
        },
        display: 'flex',
        alignItems: 'center',
        gap: 0.75
    },
    gecLogoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        flexShrink: 0,
    },
    textGec: {
        fontSize: {
            xs: 11,
            md: 12
        },
        fontWeight: 'bold'
    }
}

export default footerClasses

