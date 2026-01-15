import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState from './initialState'
import extraReducersShop from './extraReducers'
import { Cart, Product, Category } from '@/types/shop'

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        refreshStateShop: () => initialState,
        refreshStatusShop: (state) => {
            state.status = {}
        },
        setCartShop: (state, { payload }: PayloadAction<Array<Cart>>) => {
            state.cart = payload
        },
        addToCart: (state, { payload }: PayloadAction<Product>) => {
            const existingItem = state.cart.find(item => item.id === payload.id)
            if (existingItem) {
                existingItem.count += 1
            } else {
                state.cart.push({
                    id: payload.id,
                    name: payload.name,
                    image: payload.image,
                    price: payload.price,
                    count: 1,
                    description: payload.description
                })
            }
        },
        removeFromCart: (state, { payload }: PayloadAction<number>) => {
            state.cart = state.cart.filter(item => item.id !== payload)
        },
        incrementCartItem: (state, { payload }: PayloadAction<number>) => {
            const item = state.cart.find(item => item.id === payload)
            if (item) {
                item.count += 1
            }
        },
        decrementCartItem: (state, { payload }: PayloadAction<number>) => {
            const item = state.cart.find(item => item.id === payload)
            if (item && item.count > 1) {
                item.count -= 1
            }
        },
        setProducts: (state, { payload }: PayloadAction<Array<Product>>) => {
            state.products = payload
        },
        addProduct: (state, { payload }: PayloadAction<Product>) => {
            state.products.push(payload)
        },
        updateProduct: (state, { payload }: PayloadAction<Product>) => {
            const index = state.products.findIndex(p => p.id === payload.id)
            if (index !== -1) {
                state.products[index] = payload
            }
        },
        deleteProduct: (state, { payload }: PayloadAction<number>) => {
            state.products = state.products.filter(p => p.id !== payload)
        },
        setCategories: (state, { payload }: PayloadAction<Array<Category>>) => {
            state.categories = payload
        },
        addCategory: (state, { payload }: PayloadAction<Category>) => {
            state.categories.push(payload)
        },
        updateCategory: (state, { payload }: PayloadAction<Category>) => {
            const index = state.categories.findIndex(c => c.id === payload.id)
            if (index !== -1) {
                state.categories[index] = payload
            }
        },
        deleteCategory: (state, { payload }: PayloadAction<number>) => {
            state.categories = state.categories.filter(c => c.id !== payload)
        }
    },
    extraReducers(builder) {
        extraReducersShop(builder)
    },
})

export const {
    refreshStateShop,
    refreshStatusShop,
    setCartShop,
    addToCart,
    removeFromCart,
    incrementCartItem,
    decrementCartItem,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    setCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = shopSlice.actions

export default shopSlice.reducer