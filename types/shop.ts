import { StatusMap } from "./redux";

export type Category = {
    id: number;
    name: string;
    image: string;
    created_at?: string;
    updated_at?: string;
};

export type Product = {
    id: number
    name: string
    image: string
    price: number
    description: string
    category: string
    stock: number
    featured?: boolean
};

export type Cart = {
    id: number
    name: string
    image: string
    price: number
    count: number
    description: string
};

export type ShopSlice = {
    cart: Array<Cart>,
    products: Array<Product>,
    categories: Array<Category>,
    status: StatusMap
};