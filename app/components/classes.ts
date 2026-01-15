import theme from "@/theme/mui"
import { hexToRgba } from "@/utils/style"

const classes = {
    toolbar: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: .5
    },
    boxLogo: {
        display: {
            xs: 'none',
            md: 'flex'
        },
        alignItems: "center"
    },
    boxMenuResponsive: {
        display: {
            xs: 'flex',
            md: 'none'
        }
    },
    menuResponsive: {
        display: {
            xs: 'block',
            md: 'none'
        }
    },
    boxLogoResponsive: {
        display: {
            xs: "flex",
            md: "none"
        },
        alignItems: "center"
    },
    boxRoutes: {
        display: {
            xs: 'none',
            md: 'flex'
        }
    },
    buttonRoute: {
        fontWeight: 'bold',
        borderBottom: 2,
        borderRadius: 0,
    },
    buttonRouteNoSelected: {
        fontWeight: 400,
        '&:hover': {
            backgroundColor: hexToRgba(theme.palette.primary.light, .1),
        }
    },
    buttonCart: {
        backgroundColor: 'secondary.main',
        color: theme.palette.secondary.contrastText,
        p: 1,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark
        }
    },
    menuItem: {
        fontWeight: 'bold',
        backgroundColor: 'primary.main',
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
    menuItemNoSelected: {
        '&:hover': {
            backgroundColor: hexToRgba(theme.palette.primary.light, .1),
        }
    },
    shopItem: {
        position: 'relative',
        width: 350,
        borderRadius: 2,
        my: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 1,
        backgroundColor: hexToRgba(theme.palette.divider, .2)
    },
    imgShopItem: {
        borderRadius: 2,
    },
    infoItemShop: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        maxHeight: 100,
        height: 100,
    },
    actionsItemShop: {
        position: 'absolute',
        bottom: 8,
        right: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 2
    },
    buttonItemShop: {
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.secondary.contrastText,
        p: 0.1,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    nameShopItem: {
        fontWeight: 'bold',
    },
    priceShopItem: {
        fontSize: 10,
        color: theme.palette.divider,
    },
    subTotalShopItem: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark,
        mb: 1
    },
    buttonDelete: {
        position: 'absolute',
        top: 5,
        right: 7
    },
    boxItems: {
        px: 3,
        width: 400,
        maxHeight: 'calc(1271px - 250px)',
        overflowY: "auto",
        overflowX: "hidden",
    },
    boxEmptyItems: {
        px: 3,
        width: 400,
        height: 'calc(1271px - 250px)',
        maxHeight: 'calc(1271px - 250px)',
        overflowY: "auto",
        overflowX: "hidden",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
    },
    titleCart: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    boxTitleCart: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        pl: 3,
        py: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        mb: 2,
        color: theme.palette.primary.main
    },
    boxBuyShop: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 1,
        p: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.background.paper
    },
    boxTotalCart: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1,
    },
    textTotalCart: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.palette.primary.main
    },
    iconEmptyCart: {
        backgroundColor: theme.palette.secondary.light,
        borderRadius: '50%',
        p: 1,
        width: 80,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.secondary.contrastText,
        fontSize: 18
    },
    textEmpty: {
        fontWeight: 'bold',
        fontSize: 18
    },
    textEmptyInfo: {
        mb: 2
    }
}

export default classes