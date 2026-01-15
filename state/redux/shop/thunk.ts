import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProductsApi,
    createProductApi,
    updateProductApi,
    deleteProductApi,
    getCategoriesApi,
    createCategoryApi,
    updateCategoryApi,
    deleteCategoryApi
} from "./api";
import { Product, Category } from "@/types/shop";

// ==========================================
// GET PRODUCTS THUNK
// ==========================================

export const getProductsAsync = createAsyncThunk(
    "shop/getProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getProductsApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al obtener productos" });
        }
    }
);

// ==========================================
// CREATE PRODUCT THUNK
// ==========================================

export const createProductAsync = createAsyncThunk(
    "shop/createProduct",
    async ({ product, token }: { product: Omit<Product, "id">; token: string }, { rejectWithValue }) => {
        try {
            const response = await createProductApi(product, token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al crear producto" });
        }
    }
);

// ==========================================
// UPDATE PRODUCT THUNK
// ==========================================

export const updateProductAsync = createAsyncThunk(
    "shop/updateProduct",
    async ({ product, token }: { product: Product; token: string }, { rejectWithValue }) => {
        try {
            const response = await updateProductApi(product, token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al actualizar producto" });
        }
    }
);

// ==========================================
// DELETE PRODUCT THUNK
// ==========================================

export const deleteProductAsync = createAsyncThunk(
    "shop/deleteProduct",
    async ({ id, token }: { id: number; token: string }, { rejectWithValue }) => {
        try {
            const response = await deleteProductApi(id, token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al eliminar producto" });
        }
    }
);

// ==========================================
// GET CATEGORIES THUNK
// ==========================================

export const getCategoriesAsync = createAsyncThunk(
    "shop/getCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCategoriesApi();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al obtener categorías" });
        }
    }
);

// ==========================================
// CREATE CATEGORY THUNK
// ==========================================

export const createCategoryAsync = createAsyncThunk(
    "shop/createCategory",
    async ({ category, token }: { category: Omit<Category, "id">; token: string }, { rejectWithValue }) => {
        try {
            const response = await createCategoryApi(category, token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al crear categoría" });
        }
    }
);

// ==========================================
// UPDATE CATEGORY THUNK
// ==========================================

export const updateCategoryAsync = createAsyncThunk(
    "shop/updateCategory",
    async ({ category, token }: { category: Category; token: string }, { rejectWithValue }) => {
        try {
            const response = await updateCategoryApi(category, token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al actualizar categoría" });
        }
    }
);

// ==========================================
// DELETE CATEGORY THUNK
// ==========================================

export const deleteCategoryAsync = createAsyncThunk(
    "shop/deleteCategory",
    async ({ id, token }: { id: number; token: string }, { rejectWithValue }) => {
        try {
            const response = await deleteCategoryApi(id, token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data || { error: "Error al eliminar categoría" });
        }
    }
);
