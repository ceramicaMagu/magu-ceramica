import { ShopSlice } from '@/types/shop'

const initialState: ShopSlice = {
    cart: [],
    products: [],
    categories: [],
    isCartOpen: false,
    status: {}
}

export default initialState