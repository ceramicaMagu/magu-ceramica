'use client'
import { Badge, Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import { RootState } from "@/state/redux/store";
import { useDispatch, useSelector } from "react-redux";
import classes from './classes'
import Image from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { setCartShop, setCartOpen } from '@/state/redux/shop';
import { SOCIAL_NETWORKS } from '@/constants/social';

const Cart = () => {
    const cart = useSelector((state: RootState) => state.shop.cart)
    const isCartOpen = useSelector((state: RootState) => state.shop.isCartOpen)
    const siteConfig = useSelector((state: RootState) => state.auth.siteConfig)
    const dispatch = useDispatch()

    // Usar WhatsApp de config (solo si está configurado)
    const whatsappNumber = siteConfig.socialMedia.whatsapp

    const handleOpen = () => {
        dispatch(setCartOpen(!isCartOpen))
    }

    const handleDeleteItem = (id: number) => () => {
        const filterItem = [...cart].filter(item => item.id !== id)
        dispatch(setCartShop(filterItem))
    }

    const handleAddItem = (id: number) => () => {
        const countItem = [...cart].map(item => {
            if (item.id === id) {
                return ({
                    ...item,
                    count: item.count + 1
                })
            }

            return item
        })

        dispatch(setCartShop(countItem))
    }

    const handleDiscountItem = (id: number) => () => {
        const countItem = [...cart].map(item => {
            if (item.id === id && item.count > 1) {
                return ({
                    ...item,
                    count: item.count - 1
                })
            }

            return item
        })

        dispatch(setCartShop(countItem))
    }

    const handleBuy = () => {
        const formatPrice = (value: number) =>
            new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumFractionDigits: 0,
            }).format(value);

        let message = `*Hola ${SOCIAL_NETWORKS.companyName} me comunico para realizar el siguiente pedido:*\n\n`

        let total = 0;

        cart.forEach((item, index) => {
            const subtotal = item.price * item.count;
            total += subtotal;

            message +=
                `*${index + 1}. ${item.name}*\n` +
                `- ${item.description}\n` +
                `- Cantidad: ${item.count}\n` +
                `- Precio unitario: ${formatPrice(item.price)}\n` +
                `- Subtotal: ${formatPrice(subtotal)}\n\n`;
        });

        message +=
            `-------------------------\n` +
            `*Total: ${formatPrice(total)}*\n\n` +
            `Espero tu respuesta muchas gracias!`;

        if (whatsappNumber) {
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
            window.open(whatsappUrl, "_blank");
        } else {
            alert('El número de WhatsApp no está configurado. Por favor, contacta al administrador.');
        }
    }

    const getTotal = () => {
        return [...cart].reduce((total, item) => {
            return total + item.price * item.count;
        }, 0);
    }

    return (
        <Box>
            <Badge badgeContent={cart.length > 0 ? cart.length : null} color="primary">
                <IconButton
                    size="large"
                    onClick={handleOpen}
                    sx={classes.buttonCart}
                >
                    <ShoppingCartIcon />
                </IconButton>
            </Badge>

            <Drawer
                anchor={'right'}
                open={isCartOpen}
                onClose={handleOpen}
            >
                <Box sx={classes.boxTitleCart}>
                    <ShoppingCartIcon color='secondary' fontSize='large' />

                    <Typography sx={classes.titleCart}>
                        Tu carrito
                    </Typography>
                </Box>

                {
                    cart.length > 0 ?
                        <Box sx={classes.boxItems}>
                            {
                                cart.map(product =>
                                    <Box key={product.id} sx={classes.shopItem}>
                                        <Image
                                            alt={`Magu Cerámica - ${product.name}`}
                                            src={product.image}
                                            width={100}
                                            height={100}
                                            style={classes.imgShopItem}
                                        />

                                        <Box sx={classes.infoItemShop}>
                                            <Typography sx={classes.nameShopItem}>
                                                {product.name}
                                            </Typography>

                                            <Typography sx={classes.priceShopItem}>
                                                {`Precio por unidad: $${new Intl.NumberFormat("es-AR").format(product.price)}`}
                                            </Typography>

                                            <Typography sx={classes.subTotalShopItem}>
                                                {`Subtotal: $${new Intl.NumberFormat("es-AR").format(product.price * product.count)}`}
                                            </Typography>
                                        </Box>

                                        <Box sx={classes.actionsItemShop}>
                                            <IconButton
                                                size='small'
                                                sx={classes.buttonItemShop}
                                                onClick={handleDiscountItem(product.id)}
                                                disabled={product.count === 1}
                                            >
                                                <RemoveIcon />
                                            </IconButton>

                                            <Typography>
                                                {product.count}
                                            </Typography>

                                            <IconButton
                                                size='small'
                                                sx={classes.buttonItemShop}
                                                onClick={handleAddItem(product.id)}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Box>

                                        <IconButton
                                            size='small'
                                            color='error'
                                            sx={classes.buttonDelete}
                                            onClick={handleDeleteItem(product.id)}
                                        >
                                            <DeleteOutlineOutlinedIcon fontSize='small' />
                                        </IconButton>
                                    </Box>
                                )
                            }
                        </Box>
                        :
                        <Box sx={classes.boxEmptyItems}>
                            <ShoppingCartIcon
                                sx={classes.iconEmptyCart}
                            />

                            <Typography sx={classes.textEmpty}>
                                Carrito Vacío
                            </Typography>

                            <Typography sx={classes.textEmptyInfo}>
                                Agrega productos para comenzar tu compra
                            </Typography>

                            <Button
                                color='primary'
                                variant='contained'
                                onClick={handleOpen}
                            >
                                Explorar productos
                            </Button>
                        </Box>
                }

                {
                    cart.length > 0 &&
                    <Box sx={classes.boxBuyShop}>
                        <Box sx={classes.boxTotalCart}>
                            <Typography sx={classes.textTotalCart}>
                                Total:
                            </Typography>

                            <Typography sx={classes.textTotalCart}>
                                ${new Intl.NumberFormat("es-AR").format(getTotal())}
                            </Typography>
                        </Box>

                        <Button
                            startIcon={<LocalMallIcon />}
                            fullWidth
                            variant='contained'
                            onClick={handleBuy}
                        >
                            Iniciar Compra
                        </Button>

                        <Button
                            fullWidth
                            color='inherit'
                            size='small'
                            onClick={handleOpen}
                        >
                            Seguir mirando
                        </Button>
                    </Box>
                }
            </Drawer>
        </Box>
    );
};

export default Cart;