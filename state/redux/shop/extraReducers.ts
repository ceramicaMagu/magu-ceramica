/* eslint-disable @typescript-eslint/no-explicit-any */
import { Generic } from "@/types/global";
import { ShopSlice, Product, Category } from "@/types/shop";
import {
    getProductsAsync,
    createProductAsync,
    updateProductAsync,
    deleteProductAsync,
    getCategoriesAsync,
    createCategoryAsync,
    updateCategoryAsync,
    deleteCategoryAsync
} from "./thunk";

const extraReducersShop = (builder: Generic) => {
    builder
        // ==========================================
        // GET PRODUCTS
        // ==========================================
        .addCase(getProductsAsync.pending, (state: ShopSlice) => {
            state.status = {
                ...state.status,
                getProductsAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(getProductsAsync.fulfilled, (state: ShopSlice, action: any) => {
            state.products = action.payload.products;
            state.status = {
                ...state.status,
                getProductsAsync: {
                    response: "fulfilled",
                    message: "",
                    loading: false
                }
            };
        })
        .addCase(getProductsAsync.rejected, (state: ShopSlice, action: any) => {
            state.status = {
                ...state.status,
                getProductsAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al obtener productos",
                    loading: false
                }
            };
        })

        // ==========================================
        // CREATE PRODUCT
        // ==========================================
        .addCase(createProductAsync.pending, (state: ShopSlice) => {
            state.status = {
                ...state.status,
                createProductAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(createProductAsync.fulfilled, (state: ShopSlice, action: any) => {
            state.products.push(action.payload.product);
            state.status = {
                ...state.status,
                createProductAsync: {
                    response: "fulfilled",
                    message: "Producto creado exitosamente",
                    loading: false
                }
            };
        })
        .addCase(createProductAsync.rejected, (state: ShopSlice, action: any) => {
            state.status = {
                ...state.status,
                createProductAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al crear producto",
                    loading: false
                }
            };
        })

        // ==========================================
        // UPDATE PRODUCT
        // ==========================================
        .addCase(updateProductAsync.pending, (state: ShopSlice) => {
            state.status = {
                ...state.status,
                updateProductAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(updateProductAsync.fulfilled, (state: ShopSlice, action: any) => {
            const index = state.products.findIndex((p: Product) => p.id === action.payload.product.id);
            if (index !== -1) {
                state.products[index] = action.payload.product;
            }
            state.status = {
                ...state.status,
                updateProductAsync: {
                    response: "fulfilled",
                    message: "Producto actualizado exitosamente",
                    loading: false
                }
            };
        })
        .addCase(updateProductAsync.rejected, (state: ShopSlice, action: any) => {
            state.status = {
                ...state.status,
                updateProductAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al actualizar producto",
                    loading: false
                }
            };
        })

        // ==========================================
        // DELETE PRODUCT
        // ==========================================
        .addCase(deleteProductAsync.pending, (state: ShopSlice) => {
            state.status = {
                ...state.status,
                deleteProductAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(deleteProductAsync.fulfilled, (state: ShopSlice, action: any) => {
            state.products = state.products.filter((p: Product) => p.id !== action.payload.id);
            state.status = {
                ...state.status,
                deleteProductAsync: {
                    response: "fulfilled",
                    message: "Producto eliminado exitosamente",
                    loading: false
                }
            };
        })
        .addCase(deleteProductAsync.rejected, (state: ShopSlice, action: any) => {
            state.status = {
                ...state.status,
                deleteProductAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al eliminar producto",
                    loading: false
                }
            };
        })

        // ==========================================
        // GET CATEGORIES
        // ==========================================
        .addCase(getCategoriesAsync.pending, (state: ShopSlice) => {
            state.status = {
                ...state.status,
                getCategoriesAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(getCategoriesAsync.fulfilled, (state: ShopSlice, action: any) => {
            state.categories = action.payload.categories;
            state.status = {
                ...state.status,
                getCategoriesAsync: {
                    response: "fulfilled",
                    message: "",
                    loading: false
                }
            };
        })
        .addCase(getCategoriesAsync.rejected, (state: ShopSlice, action: any) => {
            state.status = {
                ...state.status,
                getCategoriesAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al obtener categorías",
                    loading: false
                }
            };
        })

        // ==========================================
        // CREATE CATEGORY
        // ==========================================
        .addCase(createCategoryAsync.pending, (state: ShopSlice) => {
            state.status = {
                ...state.status,
                createCategoryAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(createCategoryAsync.fulfilled, (state: ShopSlice, action: any) => {
            state.categories.push(action.payload.category);
            state.status = {
                ...state.status,
                createCategoryAsync: {
                    response: "fulfilled",
                    message: "Categoría creada exitosamente",
                    loading: false
                }
            };
        })
        .addCase(createCategoryAsync.rejected, (state: ShopSlice, action: any) => {
            state.status = {
                ...state.status,
                createCategoryAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al crear categoría",
                    loading: false
                }
            };
        })

        // ==========================================
        // UPDATE CATEGORY
        // ==========================================
        .addCase(updateCategoryAsync.pending, (state: ShopSlice) => {
            state.status = {
                ...state.status,
                updateCategoryAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(updateCategoryAsync.fulfilled, (state: ShopSlice, action: any) => {
            const index = state.categories.findIndex((c: Category) => c.id === action.payload.category.id);
            if (index !== -1) {
                state.categories[index] = action.payload.category;
            }
            state.status = {
                ...state.status,
                updateCategoryAsync: {
                    response: "fulfilled",
                    message: "Categoría actualizada exitosamente",
                    loading: false
                }
            };
        })
        .addCase(updateCategoryAsync.rejected, (state: ShopSlice, action: any) => {
            state.status = {
                ...state.status,
                updateCategoryAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al actualizar categoría",
                    loading: false
                }
            };
        })

        // ==========================================
        // DELETE CATEGORY
        // ==========================================
        .addCase(deleteCategoryAsync.pending, (state: ShopSlice) => {
            state.status = {
                ...state.status,
                deleteCategoryAsync: {
                    response: "pending",
                    message: "",
                    loading: true
                }
            };
        })
        .addCase(deleteCategoryAsync.fulfilled, (state: ShopSlice, action: any) => {
            state.categories = state.categories.filter((c: Category) => c.id !== action.payload.id);
            state.status = {
                ...state.status,
                deleteCategoryAsync: {
                    response: "fulfilled",
                    message: "Categoría eliminada exitosamente",
                    loading: false
                }
            };
        })
        .addCase(deleteCategoryAsync.rejected, (state: ShopSlice, action: any) => {
            state.status = {
                ...state.status,
                deleteCategoryAsync: {
                    response: "rejected",
                    message: action.payload?.error || "Error al eliminar categoría",
                    loading: false
                }
            };
        });
};

export default extraReducersShop;
