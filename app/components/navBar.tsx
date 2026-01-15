"use client";

import { useState } from "react";
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import classes from "./classes";
import Image from "next/image";
import Logo from '@/public/logo.webp'
import { ROUTES } from "@/constants/routes";
import { usePathname } from "next/navigation";
import Cart from "./cart";

const NavBar = () => {
    const pathname = usePathname();
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="fixed" component="nav" color="inherit" sx={{ top: 0, zIndex: 1100, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(10px)' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={classes.toolbar}>
                    <Box sx={classes.boxLogo}  >
                        <Link href={'/'}>
                            <Image
                                src={Logo}
                                alt="Magu Cerámica"
                                height={70}
                                priority
                            />
                        </Link>
                    </Box>

                    <Box sx={classes.boxMenuResponsive}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={classes.menuResponsive}
                        >
                            {
                                ROUTES.map((route) =>
                                    <MenuItem
                                        key={route.label}
                                        component={Link}
                                        href={route.href}
                                        onClick={handleCloseNavMenu}
                                        sx={pathname === route.href ? classes.menuItem : classes.menuItemNoSelected}
                                    >
                                        {route.label}
                                    </MenuItem>
                                )
                            }
                        </Menu>
                    </Box>

                    <Box sx={classes.boxLogoResponsive}  >
                        <Image
                            src={Logo}
                            alt="Magu Cerámica"
                            height={70}
                            priority
                        />
                    </Box>

                    <Box sx={classes.boxRoutes}>
                        {
                            ROUTES.map((route) =>
                                <Button
                                    key={route.label}
                                    component={Link}
                                    href={route.href}
                                    size="large"
                                    color={pathname === route.href ? 'primary' : 'inherit'}
                                    sx={pathname === route.href ? classes.buttonRoute : classes.buttonRouteNoSelected}
                                >
                                    {route.label}
                                </Button>
                            )
                        }
                    </Box>

                    <Cart />
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;